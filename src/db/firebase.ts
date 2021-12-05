import { ViewOutput } from '@slack/bolt'
import admin = require('firebase-admin')
import {
  MeetingToFireStore,
  MeetingWithId
} from '../types/MeetingType'
import { getInputValue } from '../utils/utils'
import { MeetingConverter } from './MeetingEntity'
import AWS from 'aws-sdk'

const region = 'ap-northeast-1'
const secretName = 'meeting-bot-ts-credentials'
const client = new AWS.SecretsManager({
  region
})

client
  .getSecretValue({ SecretId: secretName })
  .promise()
  .then((result) => {
    const serviceAccount = result.SecretString
    if (serviceAccount) {
      admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(serviceAccount))
      })
    }
  })

// const getSecret = async (secretName: string) => {
//   try {
//     const data = await client
//       .getSecretValue({
//         SecretId: secretName
//       })
//       .promise()
//     if (data) {
//       return data.SecretString
//     }
//   } catch (error) {
//     console.error('Error retrieving secrets')
//     console.error(error)
//   }
// }

// const initialize = async () => {
//   const serviceAccount = await getSecret(secretName)
//   if (serviceAccount) {
//     admin.initializeApp({
//       credential: admin.credential.cert(JSON.parse(serviceAccount))
//     })
//   }
// }

export const createMeeting = async (view: ViewOutput) => {
  const { name, place, startTime, endTime, users } =
    getInputValue(view)

  const db = admin.firestore()
  const newMeeting: MeetingToFireStore = {
    name,
    place,
    startTime,
    endTime,
    users
  }
  const result = await db.collection('meetings').add(newMeeting)
  if (!result.id) return

  const formatDateToText = (start: Date, end: Date) => {
    const dayArray = ['日', '月', '火', '水', '木', '金', '土']

    const startHour = start.getHours().toString().padStart(2, '0')
    const startMin = start.getMinutes().toString().padStart(2, '0')
    const endHour = end.getHours().toString().padStart(2, '0')
    const endMin = end.getMinutes().toString().padStart(2, '0')
    const d = ('0' + start.getDate()).slice(-2)
    const m = ('0' + (start.getMonth() + 1)).slice(-2)
    const day = dayArray[start.getDay()]

    return `${m}/${d}（${day}） の ${startHour}:${startMin} 〜 ${endHour}:${endMin}`
  }

  const dateInfo = formatDateToText(startTime, endTime)
  const returnText = `${dateInfo}に、${place}を${name}で使います！`

  return returnText
}

export const getMeetings = async (): Promise<MeetingWithId[]> => {
  const db = admin.firestore()
  const data = await db
    .collection('meetings')
    .withConverter(MeetingConverter)
    .get()
    .then((snapshot) => {
      const data: MeetingWithId[] = []
      snapshot.forEach((doc) => {
        data.push({
          ...doc.data(),
          id: doc.id
        })
      })
      data.sort((a, b) => (a.startTime < b.startTime ? -1 : 1))
      return data
    })
    .catch((err) => {
      console.log('Error getting documents', err)
    })

  return data as MeetingWithId[]
}

export const deleteMeetingById = async (id: string) => {
  const db = admin.firestore()
  await db.collection('meetings').doc(id).delete()
}

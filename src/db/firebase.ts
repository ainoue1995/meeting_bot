import { ViewOutput } from '@slack/bolt'
import admin = require('firebase-admin')
import {
  MeetingToFireStore,
  MeetingWithId
} from '../types/MeetingType'
import { getInputValue } from '../utils/utils'
import { MeetingConverter } from './MeetingEntity'

let serviceAccount = require(process.cwd() + '/credentials.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

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
  await db.collection('meetings').add(newMeeting)
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

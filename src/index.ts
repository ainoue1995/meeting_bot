import app from './initBolt'
import {
  meetingModal,
  meetingModalId
} from './components/meetingModal'

import { appHome, createMeetingActionId } from './components/appHome'
import {
  createMeeting,
  deleteMeetingById,
  getMeetings
} from './db/firebase'
import { listModal } from './components/listModal'
import { createNewMeetingActionId } from './components/modalComponents/createNewMeeting'
import { deleteMeetingActionId } from './components/appHomeComponents/MeetingDetails'
import { deleteMeetingInModalActionId } from './components/appHomeComponents/meetingDetailsInModal'

const port = Number(process.env.PORT) || 3333

;(async () => {
  await app.start(port)
  console.log(`⚡️ Bolt app is running on port ${port}`)
})()

app.event('app_home_opened', async ({ context, event }) => {
  const meetingList = await getMeetings()

  try {
    await app.client.apiCall('views.publish', {
      token: context.botToken,
      user_id: event.user,
      view: appHome(meetingList)
    })
  } catch (error) {
    console.error(error)
  }
})

// ホームタブで予約ボタンを押されたときに発火する関数
app.action(createMeetingActionId, async ({ ack, context, body }) => {
  await ack()
  // idk why but body doesn't have view property so do like following
  const newBody: any = body
  const triggerId = newBody.trigger_id
  try {
    await app.client.views.open({
      token: context.botToken,
      trigger_id: triggerId,
      view: meetingModal()
    })
  } catch (error) {
    console.error(error)
  }
})

app.command('/yoyaku', async ({ context, body, ack }) => {
  // commandは３秒以内にレスポンスを返さないとエラーになってしまうため、一旦ackでレスポンスを返す
  // use ack to prevent error cuz it'd be error if not responding within 3 secs
  await ack()
  try {
    await app.client.views.open({
      token: context.botToken,
      trigger_id: body.trigger_id,
      view: meetingModal()
    })
  } catch (error) {
    console.error(error)
  }
})

app.command('/list', async ({ context, body, ack }) => {
  // commandは３秒以内にレスポンスを返さないとエラーになってしまうため、一旦ackでレスポンスを返す
  // use ack to prevent error cuz it'd be error if not responding within 3 secs
  await ack()
  const meetingList = await getMeetings()

  try {
    await app.client.views.open({
      token: context.botToken,
      trigger_id: body.trigger_id,
      view: listModal(meetingList)
    })
  } catch (error) {
    console.error(error)
  }
})

// app.command('/hello', async ({ ack, command, say, body }) => {
//   ack()

//   try {
//     await app.client.chat.postEphemeral({
//       token: command.token,
//       channel: body.channel_id,
//       user: body.user_id,
//       text: 'test',
//       blocks: [
//         {
//           type: 'section',
//           text: {
//             type: 'plain_text',
//             text: 'This is a plain text section block.',
//             emoji: true
//           }
//         }
//       ]
//     })
//   } catch (error: any) {
//     console.log('error is occured!')
//     for (const key of Object.keys(error)) {
//       console.log('key', key)
//     }
//     console.log('error.data', error['data'])
//     console.log('error.data', error['data'].response_metadata)

//     console.error(error)
//   }
// })

// meetingModalで入力された値を受け取るための関数
app.view(
  meetingModalId,
  async ({ ack, body, view, context, client, payload }) => {
    await ack()

    try {
      const text = await createMeeting(view)

      await client.chat.postMessage({
        token: context.botToken,
        channel: 'C022R6K7FU5',
        // channel: 'D02J109NFFW',
        text,
        icon_emoji: ':shit:',
        username: '予約ツールくん'
      })
      const meetingList = await getMeetings()
      await app.client.apiCall('views.publish', {
        token: context.botToken,
        user_id: body.user.id,
        view: appHome(meetingList)
      })
    } catch (e: any) {
      console.error('e', e)
    }
  }
)

// respond to the action from meeting deleting button
app.action(
  deleteMeetingActionId,
  async ({ ack, body, context, payload }) => {
    await ack()
    // idk why but payload doesn't have value property so do like following
    const newPayload: any = payload

    try {
      await deleteMeetingById(newPayload.value)
      const meetingList = await getMeetings()
      await app.client.apiCall('views.publish', {
        token: context.botToken,
        user_id: body.user.id,
        view: appHome(meetingList)
      })
    } catch (e: any) {
      console.error('e', e)
    }
  }
)

// respond to the action from meeting deleting button in modal
app.action(
  deleteMeetingInModalActionId,
  async ({ ack, body, context, payload }) => {
    await ack()
    // idk why but payload doesn't have value property so do like following
    const newPayload: any = payload
    const newBody: any = body

    try {
      await deleteMeetingById(newPayload.value)
      const meetingList = await getMeetings()
      await app.client.views.update({
        view_id: newBody.view.id,
        token: context.botToken,
        trigger_id: newBody.trigger_id,
        view: listModal(meetingList)
      })
    } catch (e: any) {
      console.error('e', e)
    }
  }
)

app.action(
  createNewMeetingActionId,
  async ({ ack, body, context }) => {
    await ack()
    // idk why but payload doesn't have value property so do like following
    const newBody: any = body

    try {
      await app.client.views.update({
        view_id: newBody.view.id,
        token: context.botToken,
        trigger_id: newBody.trigger_id,
        view: meetingModal()
      })
    } catch (e: any) {
      console.error('e', e)
    }
  }
)

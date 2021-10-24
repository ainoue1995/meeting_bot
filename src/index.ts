import app from './initBolt'
import { meetingModal, meetingModalId } from './components/modal'

import {
  appHome,
  createMeetingActionId,
  switchLogButtonActionID
} from './components/appHome'
import {
  createMeeting,
  deleteMeetingById,
  getMeetings
} from './db/firebase'

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

app.action(
  switchLogButtonActionID,
  async ({ ack, body, context }) => {
    await ack()
    // idk why but body doesn't have view property so do like following
    const newBody: any = body
    try {
      const meetingList = await getMeetings()
      await app.client.views.update({
        token: context.botToken,
        view_id: newBody.view.id,
        view: appHome(meetingList)
      })
    } catch (e: any) {
      console.log(e)
      app.error(e)
    }
  }
)

app.command('/yoyaku', async ({ context, body, ack }) => {
  // commandは３秒以内にレスポンスを返さないとエラーになってしまうため、一旦ackでレスポンスを返す
  // use ack to prevent error cuz it'd be error if not responsing within 3 secs
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

// meetingModalで入力された値を受け取るための関数
app.view(meetingModalId, async ({ ack, body, view, context }) => {
  await ack()

  try {
    await createMeeting(view)
    const meetingList = await getMeetings()
    await app.client.apiCall('views.publish', {
      token: context.botToken,
      user_id: body.user.id,
      view: appHome(meetingList)
    })
  } catch (e: any) {
    console.error('e', e)
  }
})

// respond to the action from meeting deleting button
app.action(
  'delete_meeting',
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

import app from './initBolt'
import { meetingModal, meetingModalId } from './components/modal'

import {
  createNewMeeting,
  getAllMæeetingANdMemberList
} from './utils/utils'
import {
  appHome,
  createMeetingActionId,
  MeetingAndMembers
} from './components/appHome'

const dotenvPort = process.env.PORT as string
const port = Number(dotenvPort) || 3333

;(async () => {
  await app.start(port)
  console.log(`⚡️ Bolt app is running on port ${port}`)
})()

app.event('app_home_opened', async ({ context, event }) => {
  const meetingList: MeetingAndMembers[] =
    await getAllMæeetingANdMemberList()

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
app.view(meetingModalId, async ({ ack, body, view, client }) => {
  await ack()

  await createNewMeeting(view)
})

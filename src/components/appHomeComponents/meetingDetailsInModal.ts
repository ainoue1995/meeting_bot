import { KnownBlock } from '@slack/types'
import { MeetingWithId } from '../../types/MeetingType'

export const deleteMeetingInModalActionId =
  'delete_meeting_in_modal_action_id'

export const meetingDetailsInModal = (
  meeting: MeetingWithId,
  index: number
): KnownBlock[] => {
  const topic = meeting.name
  const meetingPlace = meeting.place
  const users = meeting.users
    .map((user) => user)
    .reduce((prev, current) => {
      prev += `<@${current}> `
      return prev
    }, ``)

  const formattedDate = (rowDate: Date) => {
    const year = rowDate.getFullYear()
    const month = ('0' + (rowDate.getMonth() + 1)).slice(-2)
    const date = ('0' + rowDate.getDate()).slice(-2)
    const hour = rowDate.getHours().toString().padStart(2, '0')
    const minutes = rowDate.getMinutes().toString().padStart(2, '0')

    return `${year}年${month}月${date}日 ${hour}:${minutes}`
  }

  const getEndTime = (rowDate: Date) => {
    const hour = rowDate.getHours().toString().padStart(2, '0')
    const minutes = rowDate.getMinutes().toString().padStart(2, '0')
    return `${hour}:${minutes}`
  }

  const createText = `議題： ${topic}\n 日付：${formattedDate(
    meeting.startTime
  )} 〜 ${getEndTime(
    meeting.endTime
  )} \n 場所： ${meetingPlace}\n参加メンバー: ${users}\n`

  return [
    {
      type: 'section',
      block_id: `meeting_details_block_id-${index}`,
      text: {
        type: 'mrkdwn',
        text: createText
      },
      accessory: {
        type: 'button',
        text: {
          type: 'plain_text',
          text: '削除'
        },
        value: meeting.id,
        style: 'danger',
        action_id: deleteMeetingInModalActionId
      }
    },
    {
      type: 'divider'
    }
  ]
}

import { KnownBlock } from '@slack/types'
import { MeetingAndMembers } from '../appHome'

export const meetingDetails = (
  meeting: MeetingAndMembers
): KnownBlock[] => {
  const topic = meeting.name
  const meetingPlace = meeting.place
  const users = meeting.members
    .map((user) => user.name)
    .reduce((prev, current) => {
      prev += `<@${current}>`
      return prev
    }, ``)
  console.log('users', users)
  const formattedDate = (rowDate: Date) => {
    const year = rowDate.getFullYear()
    const month = ('0' + (rowDate.getMonth() + 1)).slice(-2)
    const date = ('0' + rowDate.getDate()).slice(-2)
    const hour = rowDate.getHours().toString().padStart(2, '0')
    const minutes = rowDate.getMinutes().toString().padStart(2, '0')

    return `${year}年${month}月${date}日 ${hour}:${minutes}`
  }

  return [
    {
      type: 'section',
      block_id: `meeting_details_block_id-${meeting.id}`,
      text: {
        type: 'mrkdwn',
        text: `*#${topic}*\n\n*${formattedDate(
          meeting.date
        )}* *at* *${meetingPlace}*\n参加メンバー: ${users}`
      }
      // accessory: {
      //   type: 'button',
      //   text: {
      //     type: 'plain_text',
      //     text: 'Edit'
      //   },
      //   value: 'public-relations'
      // }
    },
    {
      type: 'divider'
    }
  ]
}

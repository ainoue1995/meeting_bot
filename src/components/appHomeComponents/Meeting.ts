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

  return [
    {
      type: 'section',
      block_id: `meeting_details_block_id-${meeting.id}`,
      text: {
        type: 'mrkdwn',
        text: `*#${topic}*\n\n*${meeting.date.toLocaleString()}* *at* *${meetingPlace}*\n参加メンバー: ${users}`
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

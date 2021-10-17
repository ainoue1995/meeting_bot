import { View } from '@slack/types'
import Meeting from '../entities/meeting'
import Member from '../entities/member'
import { meetingDetails } from './appHomeComponents/Meeting'

export interface MeetingAndMembers extends Meeting {
  members: Member[]
}
export const createMeetingActionId = 'create_meeting_action_id'
export const appHome = (meetingList: MeetingAndMembers[]): View => {
  const meetingBlocks = meetingList
    .map((m) => meetingDetails(m))
    .reduce((prev, next) => {
      prev.push(...next)
      return prev
    }, [])

  return {
    type: 'home',
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: '共有部_大人数利用の予約アプリです'
        }
      },
      {
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: '予約'
            },
            style: 'primary',
            value: 'newMeeting',
            action_id: createMeetingActionId
          }
        ]
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '*予約リスト*'
        }
      },
      {
        type: 'divider'
      },
      ...meetingBlocks
    ]
  }
}

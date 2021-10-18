import { View } from '@slack/types'
import Meeting from '../entities/meeting'
import Member from '../entities/member'
import { meetingDetails } from './appHomeComponents/Meeting'

export const switchLogButtonActionID = 'switch_log_button_action_id'

export interface MeetingAndMembers extends Meeting {
  members: Member[]
}
export const createMeetingActionId = 'create_meeting_action_id'
export const appHome = (
  meetingList: MeetingAndMembers[],
  buttonText: string
): View => {
  const meetingBlocks = meetingList
    .map((m) => meetingDetails(m))
    .reduce((prev, next) => {
      prev.push(...next)
      return prev
    }, [])

  return {
    type: 'home',
    private_metadata: 'private_test',
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: '共有部_大人数利用の予約アプリです'
        }
      },
      {
        type: 'section',
        text: {
          type: 'plain_text',
          text: '表示が切り替わるまで時間がかかるので連打しないでね :pray:'
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
          },
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text:
                buttonText === '過去の予約を見る'
                  ? '未来の予約を見る'
                  : '過去の予約を見る'
            },
            style: 'primary',
            value: 'switchLog',
            action_id: switchLogButtonActionID
          }
        ]
      },
      ...meetingBlocks
    ]
  }
}

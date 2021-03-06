import { View } from '@slack/types'
import { MeetingWithId } from '../types/MeetingType'
import { separateAfterAndBefore } from '../utils/utils'
import { meetingDetails } from './appHomeComponents/MeetingDetails'

export const createMeetingActionId = 'create_meeting_action_id'
export const appHome = (meetingList: MeetingWithId[]): View => {
  const [doneMeetings, comingMeetings] =
    separateAfterAndBefore(meetingList)

  const comingMeetingBlocks = comingMeetings
    .map((m, index) => meetingDetails(m, index))
    .reduce((prev, next) => {
      prev.push(...next)
      return prev
    }, [])

  const doneMeetingBlocks = doneMeetings
    .map((m, index) =>
      meetingDetails(m, index + comingMeetings.length)
    )
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
        type: 'header',
        text: {
          type: 'plain_text',
          text: '予約リスト'
        }
      },
      {
        type: 'divider'
      },
      ...comingMeetingBlocks,
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: '過去予約リスト'
        }
      },
      {
        type: 'divider'
      },
      ...doneMeetingBlocks
    ]
  }
}

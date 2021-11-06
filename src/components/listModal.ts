import { View } from '@slack/types'
import { MeetingWithId } from '../types/MeetingType'
import { separateAfterAndBefore } from '../utils/utils'
import { meetingDetailsInModal } from './appHomeComponents/meetingDetailsInModal'
import { createNewMeeting } from './modalComponents/createNewMeeting'

export const listModalId = 'meeting_dialog_view_id'

export const listModal = (meetingList: MeetingWithId[]): View => {
  const [doneMeetings, comingMeetings] =
    separateAfterAndBefore(meetingList)

  const comingMeetingBlocks = comingMeetings
    .map((m, index) => meetingDetailsInModal(m, index))
    .reduce((prev, next) => {
      prev.push(...next)
      return prev
    }, [])

  const doneMeetingBlocks = doneMeetings
    .map((m, index) =>
      meetingDetailsInModal(m, index + comingMeetings.length)
    )
    .reduce((prev, next) => {
      prev.push(...next)
      return prev
    }, [])

  return {
    type: 'modal',
    callback_id: listModalId,
    title: {
      type: 'plain_text',
      text: '共有部_大人数利用予約アプリ'
    },
    close: {
      type: 'plain_text',
      text: 'キャンセル'
    },
    blocks: [
      createNewMeeting(),
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

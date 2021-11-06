import { View } from '@slack/types'
import { datePicker } from './modalComponents/datePicker'
import { endTimePicker } from './modalComponents/endTimePicker'
import { multiUserSelector } from './modalComponents/multiUserSelector'
import { placeSelector } from './modalComponents/placeSelector'
import { startTimePicker } from './modalComponents/startTimePicker'
import { topicInput } from './modalComponents/topicInput'

export const meetingModalId = 'meeting_dialog_view_id'

export const meetingModal = (): View => {
  return {
    type: 'modal',
    callback_id: meetingModalId,
    title: {
      type: 'plain_text',
      text: '共有部_大人数利用予約アプリ'
    },
    submit: {
      type: 'plain_text',
      text: '予約'
    },
    close: {
      type: 'plain_text',
      text: 'キャンセル'
    },
    blocks: [
      topicInput(),
      placeSelector(),
      datePicker(),
      startTimePicker(),
      endTimePicker(),
      multiUserSelector()
    ]
  }
}

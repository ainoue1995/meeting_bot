import { KnownBlock } from '@slack/types'

export const endTimePickerBlockId = 'end_time_picker_block_id'
export const endTimePickerActionId = 'end_time_picker_action_id'
export const endTimePicker = (): KnownBlock => {
  return {
    type: 'input',
    block_id: endTimePickerBlockId,
    element: {
      type: 'timepicker',
      initial_time: '21:00',
      placeholder: {
        type: 'plain_text',
        text: '終了時間を入力してね'
      },
      action_id: endTimePickerActionId
    },
    label: {
      type: 'plain_text',
      text: '時間'
    }
  }
}

import { KnownBlock } from '@slack/types'

export const timePickerBlockId = 'time_picker_block_id'
export const timePickerActionId = 'time_picker_action_id'
export const timePicker = (): KnownBlock => {
  return {
    type: 'input',
    block_id: timePickerBlockId,
    element: {
      type: 'timepicker',
      initial_time: '20:00',
      placeholder: {
        type: 'plain_text',
        text: '時間を入力してね'
      },
      action_id: timePickerActionId
    },
    label: {
      type: 'plain_text',
      text: '時間'
    }
  }
}

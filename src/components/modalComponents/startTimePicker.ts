import { KnownBlock } from '@slack/types'

export const startTimePickerBlockId = 'start_time_picker_block_id'
export const startTimePickerActionId = 'start_time_picker_action_id'
export const startTimePicker = (): KnownBlock => {
  return {
    type: 'input',
    block_id: startTimePickerBlockId,
    element: {
      type: 'timepicker',
      initial_time: '20:00',
      placeholder: {
        type: 'plain_text',
        text: '時間を入力してね'
      },
      action_id: startTimePickerActionId
    },
    label: {
      type: 'plain_text',
      text: '時間'
    }
  }
}

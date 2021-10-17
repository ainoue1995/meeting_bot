import { KnownBlock } from '@slack/types'

export const datePickerBlockId = 'date_picker_block_id'
export const datePickerActionId = 'date_picker_action_id'
export const datePicker = (): KnownBlock => {
  return {
    type: 'input',
    block_id: datePickerBlockId,
    element: {
      type: 'datepicker',
      // initial_date: '1990-04-28',
      placeholder: {
        type: 'plain_text',
        text: '日付を入力してね'
      },
      action_id: datePickerActionId
    },
    label: {
      type: 'plain_text',
      text: '日付'
    }
  }
}

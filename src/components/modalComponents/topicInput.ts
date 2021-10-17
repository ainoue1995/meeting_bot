import { KnownBlock } from '@slack/types'

export const topicInputBlockId = 'topic_input_block_id'
export const topicInputActionId = 'topic_input_action_id'
export const topicInput = (): KnownBlock => {
  return {
    type: 'input',
    block_id: topicInputBlockId,
    element: {
      type: 'plain_text_input',
      action_id: topicInputActionId,
      placeholder: {
        text: '例：執行部',
        type: 'plain_text'
      }
    },
    label: {
      type: 'plain_text',
      text: '何の集まりですか？'
    }
  }
}

import { KnownBlock } from '@slack/types'

export const multiUserSelectorBlockId = 'multi_user_selector_block_id'
export const multiUserSelectorActionId =
  'multi_user_selector_action_id'
export const multiUserSelector = (): KnownBlock => {
  return {
    type: 'input',
    block_id: multiUserSelectorBlockId,
    element: {
      type: 'multi_users_select',
      placeholder: {
        type: 'plain_text',
        text: '参加予定の人を入力してね'
      },
      action_id: multiUserSelectorActionId
    },
    label: {
      type: 'plain_text',
      text: '参加メンバー'
    }
  }
}

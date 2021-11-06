import { KnownBlock } from '@slack/types'

export const createNewMeetingBlockId = 'create_new_meeting_block_id'
export const createNewMeetingActionId = 'create_new_meeting_action_id'
export const createNewMeeting = (): KnownBlock => {
  return {
    type: 'section',
    block_id: createNewMeetingBlockId,
    text: {
      type: 'mrkdwn',
      text: '新規予約はこちら！'
    },
    accessory: {
      type: 'button',
      action_id: createNewMeetingActionId,
      text: {
        type: 'plain_text',
        text: '新規予約'
      },
      style: 'primary'
    }
  }
}

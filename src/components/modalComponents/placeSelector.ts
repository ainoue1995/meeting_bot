import { KnownBlock, PlainTextOption } from '@slack/types'

const placeOptions = [
  {
    text: '5階テラス',
    value: 'fifth_terrace',
    type: 'plain_text' as 'plain_text'
  },
  {
    text: '5階屋内',
    value: 'fifth_inside',
    type: 'plain_text' as 'plain_text'
  },
  {
    text: '4階暖炉前',
    value: 'fourth_floor',
    type: 'plain_text' as 'plain_text'
  },
  {
    text: '3階ライブラリ',
    value: 'third_library',
    type: 'plain_text' as 'plain_text'
  },
  {
    text: '2階スクリーン前',
    value: 'second_screen',
    type: 'plain_text' as 'plain_text'
  },
  {
    text: '1階',
    value: 'first_floor',
    type: 'plain_text' as 'plain_text'
  }
]

const placeSelectorOptions = (): PlainTextOption[] => {
  return placeOptions.map((option) => {
    return {
      text: {
        type: option.type,
        text: option.text
      },
      value: option.value
    }
  })
}

export const placeSelectorBlockId = 'place_selector_block_id'
export const placeSelectorActionId = 'place_selector_action_id'

export const placeSelector = (): KnownBlock => {
  return {
    type: 'input',
    block_id: placeSelectorBlockId,
    element: {
      type: 'static_select',
      placeholder: {
        type: 'plain_text',
        text: '場所を選んでね'
      },
      options: placeSelectorOptions(),
      action_id: placeSelectorActionId
    },
    label: {
      type: 'plain_text',
      text: '場所'
    }
  }
}

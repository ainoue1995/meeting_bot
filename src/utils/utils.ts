import { ViewOutput } from '@slack/bolt'
import {
  datePickerActionId,
  datePickerBlockId
} from '../components/modalComponents/datePicker'
import {
  endTimePickerActionId,
  endTimePickerBlockId
} from '../components/modalComponents/endTimePicker'
import {
  multiUserSelectorActionId,
  multiUserSelectorBlockId
} from '../components/modalComponents/multiUserSelector'
import {
  placeSelectorActionId,
  placeSelectorBlockId
} from '../components/modalComponents/placeSelector'
import {
  startTimePickerActionId,
  startTimePickerBlockId
} from '../components/modalComponents/startTimePicker'
import {
  topicInputActionId,
  topicInputBlockId
} from '../components/modalComponents/topicInput'
import { MeetingToFireStore } from '../types/MeetingType'

export const getInputValue = (view: ViewOutput): MeetingToFireStore => {
  const topicValue =
    view.state.values[topicInputBlockId][topicInputActionId].value
  const placeValue =
    view.state.values[placeSelectorBlockId][placeSelectorActionId]
      .selected_option!.text.text
  const dateValue =
    view.state.values[datePickerBlockId][datePickerActionId]
      .selected_date
  const startTimeValue =
    view.state.values[startTimePickerBlockId][startTimePickerActionId]
      .selected_time
  const endTimeValue =
    view.state.values[endTimePickerBlockId][endTimePickerActionId]
      .selected_time
  const userListValue =
    view.state.values[multiUserSelectorBlockId][
      multiUserSelectorActionId
    ].selected_users
  // console.log('topicValue', topicValue)
  // console.log('placeValue', placeValue)
  // console.log('dateValue', dateValue)
  // console.log('startTimeValue', startTimeValue)
  // console.log('userListValue', userListValue)
  if (
    !topicValue ||
    !placeValue ||
    !dateValue ||
    !startTimeValue ||
    !userListValue
  )
    throw Error('value is not defined')
  return {
    name: topicValue,
    place: placeValue,
    startTime: new Date(`${dateValue} ${startTimeValue}`),
    endTime: new Date(`${dateValue} ${endTimeValue}`),
    users: userListValue
  }
}

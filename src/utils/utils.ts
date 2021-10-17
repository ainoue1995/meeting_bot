import { ViewOutput } from '@slack/bolt'
import { getRepository, LessThan, MoreThan } from 'typeorm'
import { MeetingAndMembers } from '../components/appHome'
import {
  datePickerActionId,
  datePickerBlockId
} from '../components/modalComponents/datePicker'
import {
  multiUserSelectorActionId,
  multiUserSelectorBlockId
} from '../components/modalComponents/multiUserSelector'
import {
  placeSelectorActionId,
  placeSelectorBlockId
} from '../components/modalComponents/placeSelector'
import {
  timePickerActionId,
  timePickerBlockId
} from '../components/modalComponents/timePicker'
import {
  topicInputActionId,
  topicInputBlockId
} from '../components/modalComponents/topicInput'
import { DBConnection } from '../db/Connection'
import Meeting from '../entities/meeting'
import Member from '../entities/member'

export const createNewMeeting = async (view: ViewOutput) => {
  const topicValue =
    view.state.values[topicInputBlockId][topicInputActionId].value
  const placeValue =
    view.state.values[placeSelectorBlockId][placeSelectorActionId]
      .selected_option?.text.text
  const dateValue =
    view.state.values[datePickerBlockId][datePickerActionId]
      .selected_date
  const timeValue =
    view.state.values[timePickerBlockId][timePickerActionId]
      .selected_time
  const userListValue =
    view.state.values[multiUserSelectorBlockId][
      multiUserSelectorActionId
    ].selected_users
  // console.log('topicValue', topicValue)
  // console.log('placeValue', placeValue)
  // console.log('dateValue', dateValue)
  // console.log('timeValue', timeValue)
  // console.log('userListValue', userListValue)
  if (
    !topicValue ||
    !placeValue ||
    !dateValue ||
    !timeValue ||
    !userListValue
  )
    return

  const conn = await DBConnection.get()
  const queryBuilder = conn.createQueryBuilder()

  const newMeeting = new Meeting()

  newMeeting.name = topicValue
  newMeeting.date = new Date(`${dateValue} ${timeValue}`)
  newMeeting.place = placeValue

  const res = await queryBuilder
    .insert()
    .into(Meeting)
    .values(newMeeting)
    .execute()

  const newMembers = userListValue.map(async (user) => {
    const newMember = new Member()
    newMember.name = user
    newMember.meeting_id = res.identifiers[0].id
    return newMember
  })

  console.log('newMembers', newMembers)

  await queryBuilder
    .insert()
    .into(Member)
    .values(await Promise.all(newMembers))
    .execute()

  await conn.close()
}

export const getAllMæeetingANdMemberList = async () => {
  const conn = await DBConnection.get()
  const meetingRepository = getRepository(Meeting)
  const memberRepository = getRepository(Member)
  const meetings = await meetingRepository.find({
    date: MoreThan(new Date())
  })
  const meetingAndMembersList: MeetingAndMembers[] =
    await Promise.all(
      meetings.map(async (meeting) => {
        const members = await memberRepository.find({
          meeting_id: meeting.id
        })
        console.log('members', members)

        return {
          ...meeting,
          members
        }
      })
    )

  conn.close()

  return meetingAndMembersList
}

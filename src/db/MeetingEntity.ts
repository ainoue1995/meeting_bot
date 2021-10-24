import {
  Converter,
  MeetingInFireStore,
  MeetingToFireStore,
  QueryDocumentSnapshot,
  SnapshotOptions
} from '../types/MeetingType'

export const MeetingConverter: Converter<MeetingToFireStore> = {
  toFirestore({
    name,
    place,
    startTime,
    endTime,
    users
  }: MeetingToFireStore): FirebaseFirestore.DocumentData {
    return {
      name,
      place,
      startTime: FirebaseFirestore.Timestamp.fromDate(startTime),
      endTime: FirebaseFirestore.Timestamp.fromDate(endTime),
      users
    }
  },
  fromFirestore(
    ss: QueryDocumentSnapshot,
    op: SnapshotOptions
  ): MeetingToFireStore {
    const { name, place, users, startTime, endTime } = ss.data(
      op
    ) as MeetingInFireStore

    return {
      name,
      place,
      users,
      endTime: new Date(endTime.seconds * 1000),
      startTime: new Date(startTime.seconds * 1000)
    }
  }
}

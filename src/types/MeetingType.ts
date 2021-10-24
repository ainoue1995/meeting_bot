import admin = require('firebase-admin')

interface SnapshotOptions {
  readonly serverTimestamps?: 'estimate' | 'previous' | 'none'
}
interface DocumentData {
  [key: string]: any
}
interface QueryDocumentSnapshot {
  data(option?: SnapshotOptions): DocumentData
}

type Converter<T> = {
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    op?: SnapshotOptions
  ): T
  toFirestore(model: Partial<T>): DocumentData
}

interface MeetingToFireStore {
  // id: string
  name: string
  place: string
  startTime: Date
  endTime: Date
  users: string[]
}
interface MeetingInFireStore {
  name: string
  place: string
  startTime: admin.firestore.Timestamp
  endTime: admin.firestore.Timestamp
  users: string[]
}

interface MeetingWithId extends MeetingToFireStore {
  id: string
}

export {
  MeetingWithId,
  MeetingInFireStore,
  MeetingToFireStore,
  Converter,
  QueryDocumentSnapshot,
  SnapshotOptions
}

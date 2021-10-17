import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'
import Meeting from './meeting'

@Entity('members')
export default class Member {
  @PrimaryGeneratedColumn()
  public id!: number

  @Column({ type: 'varchar', length: 32 })
  public name: string

  @ManyToOne(type => Meeting, (meeting) => meeting.members)
  public meeting_id: number
}

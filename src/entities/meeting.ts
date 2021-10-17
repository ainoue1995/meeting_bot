import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'
import Member from './member'

@Entity('meetings')
export default class Meeting {
  @PrimaryGeneratedColumn()
  public id!: number

  @Column({ type: 'varchar', length: 10 })
  public name: string

  @Column({ type: 'varchar', length: 10 })
  public place: string

  @Column({ type: 'timestamp' })
  public date: Date

  @OneToMany((type) => Member, (member) => member.meeting_id)
  members: Member[]
}

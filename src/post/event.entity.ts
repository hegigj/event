import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany, ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('event')
export class EventEntity extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column({ nullable: true })
  imageUrl: string;

  @ApiProperty()
  @Column({ type: 'timestamp' })
  start: string;

  @ApiProperty()
  @Column({ type: 'timestamp' })
  end: string;

  @ApiProperty({ type: () => UserEntity })
  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @ApiProperty({ type: () => [UserEntity] })
  @ManyToMany(() => UserEntity)
  @JoinTable()
  bookings: UserEntity[];

  @ApiProperty()
  bookCount: number;
}

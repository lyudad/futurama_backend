import { UserEntity } from 'src/modules/user/user.entity';
import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import ChatsEntity from '../chats.entity';

@Entity('messages')
export default class MessageEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text'})
  messageBody: string;

  @ManyToOne(() => UserEntity, (users: UserEntity) => users.id, {
    nullable: true,
  })
  @JoinColumn({ name: 'author' })
  author: UserEntity;

  @ManyToOne(() => ChatsEntity, (chats: ChatsEntity) => chats.id, {
    nullable: false,
  })
  @JoinColumn({ name: 'chatId' })
  chatId: ChatsEntity;

  @CreateDateColumn()
  createdAt: Date;
}
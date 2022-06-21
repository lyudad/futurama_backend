import {
    PrimaryGeneratedColumn,
    CreateDateColumn,
    Entity,
    Column
} from 'typeorm';
import { UserEntity } from '../user/user.entity';


@Entity('chats')
export default class ChatsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @Column()
    freelancer:UserEntity;

    @Column()
    owner:UserEntity;
}
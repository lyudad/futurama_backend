import {
    PrimaryGeneratedColumn,
    CreateDateColumn,
    Entity,
    ManyToOne
} from 'typeorm';
import { UserEntity } from '../user/user.entity';


@Entity('chats')
export default class ChatsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => UserEntity, UserEntity => UserEntity.id)
    public freelancer: UserEntity;

    @ManyToOne(() => UserEntity, UserEntity => UserEntity.id)
    public owner: UserEntity;
}
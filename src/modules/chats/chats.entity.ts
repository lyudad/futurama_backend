import {
    PrimaryGeneratedColumn,
    CreateDateColumn,
    Entity,
    ManyToOne
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { VacanciesEntity } from '../vacancies/entities/vacancies.entity';


@Entity('chats')
export default class ChatsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => UserEntity, UserEntity => UserEntity.id)
    public freelancer: UserEntity;

    @ManyToOne(() => VacanciesEntity, VacanciesEntity => VacanciesEntity.id)
    public vacancy: VacanciesEntity;
}
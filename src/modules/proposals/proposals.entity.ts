import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { VacanciesEntity } from '../vacancies/entities/vacancies.entity';

@Entity('proposals')
export class ProposalsEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  coverLetter: string;

  @Column()
  price: number;

  @ManyToOne(() => UserEntity, UserEntity => UserEntity.id)
  public user: string;

  @ManyToOne(() => VacanciesEntity, VacanciesEntity => VacanciesEntity.id)
  public vacancy: VacanciesEntity;
}

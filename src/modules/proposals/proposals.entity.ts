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

  @Column("varchar", { length: 500 })
  coverLetter: string;

  @Column()
  price: number;

  @ManyToOne(() => UserEntity, UserEntity => UserEntity.id)
  public userId: UserEntity;

  @ManyToOne(() => VacanciesEntity, VacanciesEntity => VacanciesEntity.id)
  public vacancyId: VacanciesEntity
}

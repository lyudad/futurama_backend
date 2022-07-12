import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { VacanciesEntity } from '../vacancies/entities/vacancies.entity';

@Entity('proposals')
export class ProposalsEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: [
      'Proposal',
      'Invite',
      'Offer'
    ]
  })
  type: string;

  @Column({ nullable: true, length: 500 })
  coverLetter: string;

  @Column({ nullable: true })
  price: number;

  @ManyToOne(() => UserEntity, UserEntity => UserEntity.id)
  public user: UserEntity;

  @ManyToOne(() => VacanciesEntity, VacanciesEntity => VacanciesEntity.id)
  public vacancy: VacanciesEntity;

  @Column({
    type: 'enum',
    enum: [
      'Accepted',
      'Pending',
      'Declined',
      'Deleted'
    ]
  })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

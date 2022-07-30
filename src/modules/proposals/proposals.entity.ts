import { ApiProperty } from '@nestjs/swagger';
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

  @ApiProperty({ example: 'Proposal', description: 'type' })
  @Column({
    type: 'enum',
    enum: [
      'Proposal',
      'Invite',
      'Offer'
    ]
  })
  type: string;

  @ApiProperty({ example: 'Lorem ipsum dolor sit amet', description: 'Letter' })
  @Column({ nullable: true, length: 500 })
  coverLetter: string;

  @ApiProperty({ example: '25', description: 'Desireble salary level' })
  @Column({ nullable: true })
  price: number;

  @ApiProperty({ example: '1', description: 'User_id' })
  @ManyToOne(() => UserEntity, UserEntity => UserEntity.id)
  public user: UserEntity;

  @ApiProperty({ example: '5', description: 'Vacancy_id' })
  @ManyToOne(() => VacanciesEntity, VacanciesEntity => VacanciesEntity.id)
  public vacancy: VacanciesEntity;

  @ApiProperty({ example: 'Pending', description: 'Status of proposal' })
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

  @ApiProperty({ example: '011232124811', description: 'Creation date' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: '011232124811', description: 'Updating date' })
  @UpdateDateColumn()
  updatedAt: Date;
}

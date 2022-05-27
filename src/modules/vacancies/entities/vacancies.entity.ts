import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { CategoriesEntity } from './categories.entity';
import { SkillsEntity } from './skills.entity';
import { ProposalsEntity } from '../../proposals/proposals.entity';
import { UserEntity } from 'src/modules/user/user.entity';

@Entity('vacancies')
export class VacanciesEntity {
  @ApiProperty({ example: '1', description: 'id' })
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => ProposalsEntity, ProposalsEntity => ProposalsEntity.vacancy)
  @JoinColumn()
  public proposals: ProposalsEntity[];

  @ApiProperty({ example: '1', description: 'category_id' })
  @ManyToOne(() => CategoriesEntity)
  category: CategoriesEntity;

  @ManyToMany(() => SkillsEntity)
  @JoinTable({ name: 'vacancies_skills' })
  skills: SkillsEntity[];

  @ApiProperty({ example: '1', description: 'owner_id' })
  @ManyToOne(() => UserEntity)
  owner: UserEntity;

  @ApiProperty({ example: 'Junior js developer', description: 'title' })
  @Column()
  title: string;

  @ApiProperty({ example: 'Google', description: 'company' })
  @Column()
  company: string;

  @ApiProperty({ example: 'Location', description: 'Kyiv, Ukraine' })
  @Column()
  location: string;

  @ApiProperty({ example: 'Very good project', description: 'description' })
  @Column('varchar', { length: 500 })
  description: string;

  @ApiProperty({ example: 'Intermediate', description: 'english level' })
  @Column({
    type: 'enum',
    enum: [
      'Elementary',
      'Pre-intermediate',
      'Intermediate',
      'Upper-intermediate',
      'Advanced',
    ],
  })
  englishLevel: string;

  @ApiProperty({ example: '1000', description: 'price' })
  @Column()
  price: number;

  @ApiProperty({ example: '40', description: 'time per week' })
  @Column()
  timePerWeek: number;

  @ApiProperty({ example: '011232124811', description: 'creation date' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: '011232124811', description: 'creation date' })
  @UpdateDateColumn()
  updatedAt: Date;
}



import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { CategoriesEntity } from './categories.entity';
import { SkillsEntity } from './skills.entity';
// import { UserEntity } from 'modules/user/user.entity';

@Entity('vacancies')
export class VacanciesEntity {
  @ApiProperty({ example: '1', description: 'id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: '1', description: 'category_id' })
  @ManyToOne(() => CategoriesEntity)
  category: CategoriesEntity;

  @ManyToMany(() => SkillsEntity)
  @JoinTable({ name: 'vacancies_skills' })
  skills: SkillsEntity[];

  @ApiProperty({ example: '1', description: 'owner_id' })
  @Column()
  ownerId: number;

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
  @Column()
  description: string;

  @ApiProperty({ example: 'Entermediate', description: 'english level' })
  @Column({
    type: 'enum',
    enum: [
      'elementary',
      'pre-intermediate',
      'intermediate',
      'upper-intermediate',
      'advanced',
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
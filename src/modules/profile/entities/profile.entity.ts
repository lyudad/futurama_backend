import { UserEntity } from 'src/modules/user/user.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EducationEntity } from './education.entity';
import { SkillsEntity } from '../../vacancies/entities/skills.entity';
import { WorkExperienceEntity } from './workExperience.entity';
import { CategoriesEntity } from 'src/modules/vacancies/entities/categories.entity';

@Entity('profile')
export class ProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: [
      'Elementary',
      'Pre-intermediate',
      'Intermediate',
      'Upper-intermediate',
      'Advanced',
    ],
    nullable: true
  })
  englishLevel: string;

  @Column({nullable: true})
  desirebleSalaryLevel: number;

  @Column({nullable: true})
  availableAmountOfHours: number;

  @Column('text')
  otherExperience: string;

  @Column('text')
  description: string;

  @ManyToOne(() => CategoriesEntity)
  @JoinColumn()
  position: CategoriesEntity;

  @OneToOne(() => UserEntity, user => user.profile)
  @JoinColumn()
  user: UserEntity;

  @ManyToMany(() => SkillsEntity)
  @JoinTable({ name: 'profile_skills' })
  skills: SkillsEntity[];

  @OneToMany(() => EducationEntity, education => education.profile)
  @JoinColumn()
  educations: EducationEntity[];

  @OneToMany(() => WorkExperienceEntity, workExperience => workExperience.profile)
  @JoinColumn()
  workExperience: WorkExperienceEntity[];
}

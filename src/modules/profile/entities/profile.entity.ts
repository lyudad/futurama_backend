import { UserEntity } from 'src/modules/user/user.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EducationEntity } from './education.entity';
import { SkillsEntity } from '../../vacancies/entities/skills.entity';
import { WorkExperienceEntity } from './workExperience.entity';

@Entity('profile')
export class ProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  englishLevel: string;

  @Column()
  position: string;

  @Column()
  desirebleSalaryLevel: number;

  @Column()
  availableAmountOfHours: number;

  @Column()
  otherExperience: string;

  @Column()
  description: string;

  @OneToOne(() => UserEntity, user => user.profile)
  @JoinColumn()
  user: UserEntity;
  
  @ManyToMany(() => SkillsEntity)
  @JoinTable()
  skills: SkillsEntity[];

  @OneToMany(() => EducationEntity, education => education.profile)
  @JoinColumn()
  educations: EducationEntity[];

  @OneToMany(() => WorkExperienceEntity, workExperience => workExperience.profile)
  @JoinColumn()
  workExperience: WorkExperienceEntity[];
}

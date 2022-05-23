import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProfileEntity } from './profile.entity';

@Entity('workExperience')
export class WorkExperienceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  company: string;

  @Column()
  position: string;

  @Column()
  start: Date;

  @Column()
  end: Date;

  @Column()
  description: string;

  @ManyToOne(() => ProfileEntity, profile => profile.workExperience)
  @JoinColumn()
  profile: ProfileEntity;
}

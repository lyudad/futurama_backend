import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProfileEntity } from './profile.entity';

@Entity('education')
export class EducationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  establishment: string;

  @Column()
  level: string;

  @Column()
  start: Date;

  @Column()
  end: Date;

  @ManyToOne(() => ProfileEntity, profile => profile.educations)
  @JoinColumn()
  profile: ProfileEntity;
}

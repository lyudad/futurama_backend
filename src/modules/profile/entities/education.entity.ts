import { Type } from 'class-transformer';
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

  @Type(() => Date)
  @Column()
  start: Date;

  @Type(() => Date)
  @Column()
  end: Date;

  @ManyToOne(() => ProfileEntity, profile => profile.educations)
  @JoinColumn()
  profile: ProfileEntity;
}

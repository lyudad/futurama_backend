import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProfileEntity } from '../../profile/entities/profile.entity';

@Entity('skills')
export class SkillsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  skill: string;

  @ManyToMany(() => ProfileEntity, profile => profile.skills)
  prfiles: ProfileEntity[];
}

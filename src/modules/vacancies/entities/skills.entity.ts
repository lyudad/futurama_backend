import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('skills')
export class SkillsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: true })
  skill: string;
}

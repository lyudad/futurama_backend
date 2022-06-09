import { Type } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';
  
@Entity('contracts')
export class ContractsEntity {
  
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    title: string;
  
    @Column()
    hourlyRate: number;

    @Column()
    description: string;

    @Type(() => Date)
    @Column()
    start: Date;

    @Type(() => Date)
    @Column()
    end: Date;

    @Column()
    active: boolean;
  
    @ManyToOne(() => UserEntity)
    @JoinColumn()
    freelancer: UserEntity;

    @ManyToOne(() => UserEntity)
    @JoinColumn()
    owner: UserEntity;
}
  
import { Type } from 'class-transformer';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { VacanciesEntity } from '../vacancies/entities/vacancies.entity';

@Entity('contracts')
export class ContractsEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    hourlyRate: number;

    @Column('text')
    description: string;

    @Type(() => Date)
    @CreateDateColumn()
    start: Date;

    @Type(() => Date)
    @UpdateDateColumn({ nullable: true })
    end: Date;

    @Column()
    active: boolean;

    @ManyToOne(() => UserEntity)
    @JoinColumn()
    freelancer: UserEntity;

    @ManyToOne(() => UserEntity)
    @JoinColumn()
    owner: UserEntity;

    @ManyToOne(() => VacanciesEntity)
    @JoinColumn()
    vacancy: VacanciesEntity;
}

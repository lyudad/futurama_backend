import { IsNotEmpty } from 'class-validator';
import { UserEntity } from '../user/user.entity';
import { VacanciesEntity } from '../vacancies/entities/vacancies.entity';

export class ContractsDTO {
    id?: number;

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    hourlyRate: number;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    start: Date;

    @IsNotEmpty()
    end: Date;

    @IsNotEmpty()
    active: boolean;

    @IsNotEmpty()
    freelancer: UserEntity;

    @IsNotEmpty()
    owner: UserEntity;

    @IsNotEmpty()
    vacancy: VacanciesEntity;

}

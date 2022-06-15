import { IsNotEmpty } from 'class-validator';
import { UserEntity } from '../user/user.entity';
import { VacanciesEntity } from '../vacancies/entities/vacancies.entity';


export class ProposalsDTO {

  @IsNotEmpty()
  user: UserEntity;

  @IsNotEmpty()
  vacancy: VacanciesEntity;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  coverLetter: string;

  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  type: string;
}

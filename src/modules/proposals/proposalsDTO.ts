import { IsNotEmpty } from 'class-validator';
import { UserEntity } from '../user/user.entity';
import { VacanciesEntity } from '../vacancies/entities/vacancies.entity';


export class ProposalsDTO {
  
  @IsNotEmpty()
  userId: UserEntity

  @IsNotEmpty()
  vacancyId: VacanciesEntity
  
  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  coverLetter: string;
}

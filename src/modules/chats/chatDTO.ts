import { IsNotEmpty } from 'class-validator';
import { UserEntity } from '../user/user.entity';
import { VacanciesEntity } from '../vacancies/entities/vacancies.entity';


export class ChatDTO {

  @IsNotEmpty()
  freelancer: UserEntity;

  @IsNotEmpty()
  owner: UserEntity;
}

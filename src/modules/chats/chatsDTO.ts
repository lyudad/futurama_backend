import { IsNotEmpty } from 'class-validator';
import { UserEntity } from '../user/user.entity';
import { VacanciesEntity } from '../vacancies/entities/vacancies.entity';

export class ChatsDTO {

  @IsNotEmpty()
  freelancerId: UserEntity;

  @IsNotEmpty()
  vacancy: VacanciesEntity;
}

import { IsNotEmpty } from 'class-validator';
import { UserEntity } from '../user/user.entity';

export class ChatsDTO {

  @IsNotEmpty()
  freelancer: UserEntity;

  @IsNotEmpty()
  owner: UserEntity;
}

import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

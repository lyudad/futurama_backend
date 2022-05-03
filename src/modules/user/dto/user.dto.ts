import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserDTO {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

import { IsEmail, IsNotEmpty } from 'class-validator';

export class User {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  phone: string;

  photo: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  role: string;
}

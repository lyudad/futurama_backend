import { IsEmail, IsNotEmpty } from 'class-validator';

export class ContactsDTO {
    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    phone: string; 
}

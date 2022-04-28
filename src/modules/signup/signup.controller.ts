import { Body, Controller, Get, Post } from '@nestjs/common';
import { SignUpService } from './signup.service';
import { CreateUserDto } from "../dto/create.user.dto";
import { User } from '../enteties/users.entity';

@Controller('signup')
export class SignUpController {
    constructor(private SignUpService: SignUpService) {}

    @Post()
    async add(@Body() userDto:CreateUserDto): Promise<User>{
        try {
            return await this.SignUpService.add(userDto);
        } catch (error) {
            return error
        }
        
    }
}

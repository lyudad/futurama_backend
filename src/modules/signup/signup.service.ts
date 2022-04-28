import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../enteties/users.entity';
import { CreateUserDto } from '../dto/create.user.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class SignUpService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    googleSignUp(req){
        return req.user
    }

    async add(userDto: CreateUserDto): Promise<User> {
        try {
            const hash = await bcrypt.hash(userDto.password, Number(2))  
            if (hash) {
                userDto.password = hash
                return await this.userRepository.save(userDto);
            }
            
        } catch (error) {
            return error
        }
    }
}

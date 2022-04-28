import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../enteties/users.entity';
import { CreateUserDto } from '../dto/create.user.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class SignUpService {

    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) {}

    googleSignUp(req){
        return req.user
    }

    async add(userDto: CreateUserDto): Promise<UserEntity> {
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

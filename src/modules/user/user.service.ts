import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDTO } from './dto/user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async login(data: UserDTO) {
    const { email, password } = data;
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user || (await user.comparePassword(password))) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.BAD_REQUEST,
      );
    }
    return user.toResponceObject();
  }

  googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }
    return req.data;
  }
}

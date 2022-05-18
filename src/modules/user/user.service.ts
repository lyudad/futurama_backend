import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDTO } from './dto/user.login';
import { User } from './dto/user.register';
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

    if (!user || !(await user.comparePassword(password))) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.BAD_REQUEST,
      );
    }
    return user.toResponceObject();
  }

  async register(data: User) {
    let user = await this.userRepository.findOne({
      where: { email: data.email },
    });
    if (user) {
      throw new HttpException(
        'User with this email is exsist!',
        HttpStatus.BAD_REQUEST,
      );
    }
    user = this.userRepository.create({...data, phone: '', photo: ''});
    return this.userRepository.save(user);
  }
}

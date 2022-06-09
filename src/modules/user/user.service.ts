import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileEntity } from '../profile/entities/profile.entity';
import { UserDTO } from './dto/user.login';
import { User } from './dto/user.register';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
  ) { }

  async login(data: UserDTO): Promise<object> {
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

  async register(data: User): Promise<object> {
    try {
      let user = await this.userRepository.findOne({ where: { email: data.email } });
      if (user) {
        throw new HttpException(
          'User with this email is exsist!',
          HttpStatus.BAD_REQUEST,
        );
      }
      user = this.userRepository.create({ ...data, phone: '', photo: '' });
      const result = await this.userRepository.save(user);
      if(result){
        const profile = this.profileRepository.create();
        profile.user = result;
        await this.profileRepository.save(profile);
        return result.toResponceObject();
      }else{
        throw new HttpException(
          'Something went wrong)',
          HttpStatus.CONFLICT
        );
      }
    } catch (error) {
        throw error;
    }
  }
}

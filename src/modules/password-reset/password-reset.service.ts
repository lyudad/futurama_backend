import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { Repository } from 'typeorm';
import { UserDTO } from '../user/dto/user.login';
import * as bcrypt from 'bcrypt';
import * as Crypto from 'crypto-js';

@Injectable()
export class PasswordResetService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }

  async findById(id: number): Promise<UserEntity> {
    try {
      const user = await this.userRepository
        .createQueryBuilder()
        .where('id = :id', { id })
        .getOne();
      if (!user) {
        throw new HttpException(
          `User with id ${id} was not found`,
          HttpStatus.NOT_FOUND,
        );
      } else {
        return user;
      }
    } catch (error) {
      throw error;
    }
  }

  async findByEmail(email: string): Promise<UserEntity> {
    try {
      const originalEmail = Crypto.AES.decrypt(
        email,
        process.env.DECRYPT_KEY,
      ).toString(Crypto.enc.Utf8);

      const user = await this.userRepository
        .createQueryBuilder()
        .where('email = :originalEmail', { originalEmail })
        .getOne();

      if (!user) {
        throw new HttpException(`User was not found`, HttpStatus.NOT_FOUND);
      } else {
        return user;
      }
    } catch (error) {
      throw error;
    }
  }

  async changePassword(id: number, UserDTO: UserDTO): Promise<UserEntity> {
    try {
      const hash = await bcrypt.hash(UserDTO.password, 10);

      await this.userRepository
        .createQueryBuilder()
        .update()
        .set({ password: hash })
        .where('id = :id', { id })
        .execute();

      throw new HttpException('Done', HttpStatus.OK);
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers(): Promise<UserEntity[]> {
    {
      try {
        const exampleUsers = await this.userRepository
          .createQueryBuilder()
          .getMany();
        return exampleUsers;
      } catch (error) {
        throw error;
      }
    }
  }
}

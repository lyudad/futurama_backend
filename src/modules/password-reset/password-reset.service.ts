import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { Repository } from 'typeorm';
import { UserDTO } from '../user/dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordResetService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findByEmail(email: UserDTO): Promise<UserEntity> {
    const user = await this.userRepository
      .createQueryBuilder()
      .where('email = :email', { email })
      .getOne();

    return user;
  }

  async findById(id: number): Promise<UserEntity> {
    const user = await this.userRepository
      .createQueryBuilder()
      .where('id = :id', { id })
      .getOne();
    return user;
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

      const user = await this.findById(id);
      return user;
    } catch (e) {
      throw new ConflictException(e.sqlMessage);
    }
  }

  async getAllUsers(): Promise<UserEntity[]> {
    {
      const exampleUsers = await this.userRepository
        .createQueryBuilder()
        .getMany();
      return exampleUsers;
    }
  }
}

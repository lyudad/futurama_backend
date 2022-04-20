import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExampleUser } from './example.entity';
import { Repository } from 'typeorm';
import { CreateExampleDto } from './dto/create.example.dto';

@Injectable()
export class ExampleService {
  constructor(
    @InjectRepository(ExampleUser)
    private exampleRepository: Repository<ExampleUser>,
  ) {}

  async createUser(dto: CreateExampleDto): Promise<ExampleUser> {
    try {
      const exampleUser = await this.exampleRepository.save(dto);
      return exampleUser;
    } catch (e) {
      throw new ConflictException(e.sqlMessage);
    }
  }

  async getAllUsers(): Promise<ExampleUser[]> {
    try {
      const exampleUsers = await this.exampleRepository.find();
      return exampleUsers;
    } catch (e) {
      return e;
    }
  }
}

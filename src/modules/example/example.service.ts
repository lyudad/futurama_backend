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

  async createUser(ExampleUser: CreateExampleDto) {
    try {
      await this.exampleRepository
        .createQueryBuilder()
        .insert()
        .values(ExampleUser)
        .execute();

      return ExampleUser;
    } catch (e) {
      throw new ConflictException(e.sqlMessage);
    }
  }

  async getAllUsers(): Promise<ExampleUser[]> {
    {
      const exampleUsers = await this.exampleRepository
        .createQueryBuilder()
        .getMany();
      return exampleUsers;
    }
  }
}

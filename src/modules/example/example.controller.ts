import { Body, Controller, Post, Get } from '@nestjs/common';
import { ExampleService } from './example.service';
import { CreateExampleDto } from './dto/create.example.dto';
import { ExampleUser } from './example.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Регистрация')
@Controller('example')
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @ApiOperation({ summary: 'User creation' })
  @ApiResponse({ status: 200, type: ExampleUser })
  @Post()
  async createUser(@Body() ExampleUser: CreateExampleDto) {
    return this.exampleService.createUser(ExampleUser);
  }

  @ApiOperation({ summary: 'Getting all users' })
  @ApiResponse({ status: 200, type: [ExampleUser] })
  @Get()
  async allUser() {
    const users = await this.exampleService.getAllUsers();
    return users;
  }
}

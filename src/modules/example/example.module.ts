import { Module } from '@nestjs/common';
import { ExampleService } from './example.service';
import { ExampleController } from './example.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExampleUser } from './example.entity';

@Module({
  providers: [ExampleService],
  controllers: [ExampleController],
  imports: [TypeOrmModule.forFeature([ExampleUser])],
})
export class ExampleModule {}

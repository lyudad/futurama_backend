import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user.entity';

import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';


@Module({
  providers: [ContactsService],
  controllers: [ContactsController],
  imports: [TypeOrmModule.forFeature([UserEntity])],
  exports: [TypeOrmModule]
})
export class ContactsModule { }

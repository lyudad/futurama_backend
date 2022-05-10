import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { UserEntity } from '../user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [MailService],
  controllers: [MailController],
  imports: [TypeOrmModule.forFeature([UserEntity])],
})
export class MailModule {}

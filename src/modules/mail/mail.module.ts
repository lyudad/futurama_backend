import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { UserEntity } from '../user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [MailService, ConfigService],
  controllers: [MailController],
  imports: [TypeOrmModule.forFeature([UserEntity])],
  exports: [MailService],
})
export class MailModule {}

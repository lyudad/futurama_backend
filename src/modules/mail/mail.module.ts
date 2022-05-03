import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [MailService, ConfigService],
  controllers: [MailController],
})
export class MailModule {}

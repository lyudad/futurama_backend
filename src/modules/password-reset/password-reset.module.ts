import { Module } from '@nestjs/common';
import { PasswordResetService } from './password-reset.service';
import { PasswordResetController } from './password-reset.controller';
import { UserEntity } from '../user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from '../mail/mail.module';

@Module({
  providers: [PasswordResetService],
  controllers: [PasswordResetController],
  imports: [TypeOrmModule.forFeature([UserEntity]), MailModule],
})
export class PasswordResetModule {}

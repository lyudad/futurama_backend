import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { Repository } from 'typeorm';
import * as SendGrid from '@sendgrid/mail';
import * as Crypto from 'crypto-js';

@Injectable()
export class MailService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {
    SendGrid.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async findByEmail(email: string): Promise<UserEntity> {
    try {
      const user = await this.userRepository
        .createQueryBuilder()
        .where('email = :email', { email })
        .getOne();

      if (!user) {
        throw new HttpException(
          `User with email ${email} was not found`,
          HttpStatus.NOT_FOUND,
        );
      } else {
        return user;
      }
    } catch (error) {
      throw error;
    }
  }

  async send(email: string): Promise<UserEntity> {
    try {
      await this.findByEmail(email);

      const cipherEmail = Crypto.AES.encrypt(
        email,
        process.env.DECRYPT_KEY,
      ).toString();

      await SendGrid.send({
        to: email,
        subject: 'Futurama password reset link',
        from: process.env.SENDGRID_DOMAIN,
        text: 'Please follow the link to change your password. If you have not initiated a password change, ignore this message.',
        html: `<h1>Please follow the <a href=${process.env.FRONTEND_BASE_URL}/password/make_new?email=${cipherEmail}">LINK</a> to change your password. If you have not initiated a password change, ignore this message.</h1>`,
      });
      throw new HttpException('Done', HttpStatus.OK);
    } catch (error) {
      throw error;
    }
  }
}

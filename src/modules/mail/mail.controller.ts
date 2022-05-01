import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mail.service';
import { UserDTO } from '../user/dto/user.dto';
import { ConfigService } from '@nestjs/config';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Sending email')
@Controller('mail')
export class MailController {
  constructor(
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
  ) {}

  @ApiOperation({ summary: 'Sending email' })
  @ApiResponse({ status: 201, type: UserDTO })
  @Post('send')
  async sendEmail(@Body() body: UserDTO) {
    try {
      const mail = {
        to: body.email,
        subject: 'Futurama password reset link',
        from: this.configService.get<string>('SENDGRID_DOMAIN'),
        text: 'Please follow the link to change your password. If you have not initiated a password change, ignore this message.',
        html: `<h1>Please follow the <a href="http://localhost:3000/password_make_new">LINK</a> to change your password. If you have not initiated a password change, ignore this message.</h1>`,
      };

      return await this.mailService.send(mail);
    } catch (error) {
      return error;
    }
  }
}

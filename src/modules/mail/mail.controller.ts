import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mail.service';
import { UserDTO } from '../user/dto/user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Sending email')
@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @ApiOperation({ summary: 'Sending email' })
  @ApiResponse({ status: 201, type: UserDTO })
  @Post('send')
  async sendEmail(@Body() body: UserDTO): Promise<UserDTO> {
    try {
      await this.mailService.send(body.email);
    } catch (error) {
      return error;
    }
  }
}

import { Controller, Get, Body, Query, Patch } from '@nestjs/common';
import { PasswordResetService } from './password-reset.service';
import { MailService } from '../mail/mail.service';

import { UserEntity } from '../user/user.entity';
import { UserDTO } from '../user/dto/user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Password-reset')
@Controller('password')
export class PasswordResetController {
  constructor(
    private readonly passwordResetService: PasswordResetService,
    private readonly mailService: MailService,
  ) {}

  @ApiOperation({ summary: 'Changing password' })
  @ApiResponse({ status: 200, type: UserDTO })
  @Patch('reset')
  async getUserByEmail(
    @Body() UserDTO: UserDTO,
    @Query('email') email: string,
  ): Promise<UserEntity> {
    try {
      const user = await this.mailService.findByEmail(email);
      await this.passwordResetService.changePassword(user.id, UserDTO);
    } catch (error) {
      return error;
    }
  }

  @ApiOperation({ summary: 'Getting all users' })
  @ApiResponse({ status: 200, type: UserEntity })
  @Get()
  async allUser(): Promise<UserEntity[]> {
    try {
      const users = await this.passwordResetService.getAllUsers();
      return users;
    } catch (error) {
      return error;
    }
  }
}

import { Controller, Get, Body, Query, Patch } from '@nestjs/common';
import { PasswordResetService } from './password-reset.service';
import { UserDTO } from '../user/dto/user.login';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Password-reset')
@Controller('password')
export class PasswordResetController {
  constructor(private readonly passwordResetService: PasswordResetService) { }

  @ApiOperation({ summary: 'Changing password' })
  @ApiResponse({ status: 200, type: UserDTO })
  @Patch('reset')
  async getUserByEmail(
    @Body() UserDTO: UserDTO,
    @Query('email') email: string,
  ): Promise<void> {
    try {
      const user = await this.passwordResetService.findByEmail(email);
      await this.passwordResetService.changePassword(user.id, UserDTO);
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: 'Getting all users' })
  @ApiResponse({ status: 200, type: UserDTO })
  @Get()
  async allUser(): Promise<UserDTO[]> {
    try {
      const users = await this.passwordResetService.getAllUsers();
      return users;
    } catch (error) {
      throw error;
    }
  }
}

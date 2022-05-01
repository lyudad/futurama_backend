import {
    Controller,
    Post,
    Body,
    Query,
    NotFoundException,
  } from '@nestjs/common';
  import { PasswordResetService } from './password-reset.service';
  import { UserDTO } from '../user/dto/user.dto';
  import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
  
  @ApiTags('Password-reset')
  @Controller('password')
  export class PasswordResetController {
    constructor(private readonly passwordResetService: PasswordResetService) {}
  
    @ApiOperation({ summary: 'Changing password' })
    @ApiResponse({ status: 200, type: UserDTO })
    @Post('reset')
    async getUserByEmail(
      @Body() UserDTO: UserDTO,
      @Query('email') email: UserDTO,
    ): Promise<any> {
      const user = await this.passwordResetService.findByEmail(email);
      if (!user) {
        throw new NotFoundException(`User with email ${email} was not found`);
      } else {
        const newUser = await this.passwordResetService.changePassword(
          user.id,
          UserDTO,
        );
        return newUser;
      }
    }
  }
  
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  appService: any;
  constructor(private userService: UserService) {}
  @Post('/login')
  @UsePipes(new ValidationPipe())
  login(@Body() data: UserDTO) {
    return this.userService.login(data);
  }
  @Get('/auth/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    return req;
  }

  @Get('/auth/google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.appService.googleLogin(req);
  }
}

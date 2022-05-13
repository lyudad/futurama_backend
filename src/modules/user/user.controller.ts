import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserDTO } from './dto/user.login';
import { User } from './dto/user.register';
import { UserService } from './user.service';

@ApiTags('Auth')
@Controller('/user')
export class UserController {
  appService: any;
  constructor(private userService: UserService) {}
  @Post('/login')
  @UsePipes(new ValidationPipe())
  login(@Body() data: UserDTO) {
    return this.userService.login(data);
  }  
  @Post('/register')
  @UsePipes(new ValidationPipe())
  register(@Body() data: User) {
    return this.userService.register(data);
  }
}

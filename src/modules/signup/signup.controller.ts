import { Body, Controller, Get, Post, Req, UseGuards, HttpStatus } from '@nestjs/common';
import { SignUpService } from './signup.service';
import { CreateUserDto } from "../dto/create.user.dto";
import { User } from '../enteties/users.entity';
import { AuthGuard } from '@nestjs/passport';
import { IGetUserAuthInfoRequest } from '../types/auth.interface';

@Controller()
export class SignUpController {
    constructor(private SignUpService: SignUpService) {}

    @Get("/facebook")
    @UseGuards(AuthGuard("facebook"))
    async facebookLogin() {
        return HttpStatus.OK;
    }

    @Get("/facebook/redirect")
    @UseGuards(AuthGuard("facebook"))
    async facebookLoginRedirect(@Req() req:IGetUserAuthInfoRequest) {
        return {
        statusCode: HttpStatus.OK,
        data: req.user,
        };
    }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req) {}

    @Get('google/redirect')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Req() req) {
        return this.SignUpService.googleSignUp(req)
    }

    @Post('signup')
    async add(@Body() userDto:CreateUserDto): Promise<User>{
        try {
            return await this.SignUpService.add(userDto);
        } catch (error) {
            return error
        }
        
    }
}

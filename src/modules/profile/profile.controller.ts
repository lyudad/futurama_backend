import { Controller, Headers, Get, HttpException, HttpStatus } from '@nestjs/common';
import { encodeJwt } from 'src/utils/jwt';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
    constructor(private profileService: ProfileService) {}
    @Get('')
    getMyProfile(@Headers() headers: any) {
        if(!headers.token){
            throw new HttpException(
                'Unauthorized',
                HttpStatus.UNAUTHORIZED,
              );
        }else{
            return this.profileService.getProfile(encodeJwt(headers.token));
        }
    }
}

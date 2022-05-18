import { Controller, Headers, Get, HttpException, HttpStatus } from '@nestjs/common';
import { encodeJwt } from 'src/utils/jwt';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
    constructor(private profileService: ProfileService) {}
    @Get('')
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any    
    getMyProfile(@Headers() headers: any): Promise<object>{        
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

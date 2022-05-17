import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileEntity } from './entities/profile.entity';

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(ProfileEntity)
        private profileRepository: Repository<ProfileEntity>,
      ) {}

    async getProfile(id: number){
        const profile = await this.profileRepository.findOne({where: {user: id}, relations: ['workExperience', 'skills', 'educations']})
        if(!profile){
            throw new HttpException(
                'There is no data',
                HttpStatus.NO_CONTENT,
              );
        }
        return profile;
    }
}

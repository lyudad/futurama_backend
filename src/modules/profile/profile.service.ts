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

    async getProfile(id: number): Promise<object>{
        const profile = await this.profileRepository.createQueryBuilder('profile')
        .leftJoinAndSelect('profile.workExperience', 'workExperience')
        .leftJoinAndSelect('profile.skills', 'skills')
        .leftJoinAndSelect('profile.educations', 'educations')
        .where('profile.user = :id', { id })     
        .getOne();
        
        if(!profile){
            throw new HttpException(
                'There is no data',
                HttpStatus.NO_CONTENT,
              );
        }
        return profile;
    }
}

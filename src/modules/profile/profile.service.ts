import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EducationDTO } from './dto/education.dto';
import { ProfileDTO } from './dto/profile.dto';
import { WorkExperienceDTO } from './dto/workExperience.dto';
import { EducationEntity } from './entities/education.entity';
import { ProfileEntity } from './entities/profile.entity';
import { WorkExperienceEntity } from './entities/workExperience.entity';

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(ProfileEntity)
        private profileRepository: Repository<ProfileEntity>,
        @InjectRepository(EducationEntity)
        private readonly educationRepository: Repository<EducationEntity>,
        @InjectRepository(WorkExperienceEntity)
        private readonly workExperienceRepository: Repository<WorkExperienceEntity>,
    ) { }

    async getProfile(id: number): Promise<object> {
        const profile = await this.profileRepository.createQueryBuilder('profile')
            .leftJoinAndSelect('profile.workExperience', 'workExperience')
            .leftJoinAndSelect('profile.skills', 'skills')
            .leftJoinAndSelect('profile.educations', 'educations')
            .leftJoinAndSelect('profile.position', 'categories')
            .where('profile.user = :id', { id })
            .getOne();

        if (!profile) {
            throw new HttpException(
                'There is no data',
                HttpStatus.NO_CONTENT,
            );
        }
        return profile;
    }

    async setProfile(profile: ProfileDTO): Promise<object> {
        try {
            await this.profileRepository.save({
              ...profile,
              skills: profile.skills.map((skill: number) => ({ id: skill })),
            });
            throw new HttpException('Profile saved successfully', HttpStatus.OK);
          } catch (error) {
            throw error;
          }
    }

    async createEducation(education: EducationDTO): Promise<EducationEntity> {
        try {
          await this.educationRepository
            .createQueryBuilder()
            .insert()
            .values(education)
            .execute();
    
          throw new HttpException('Education created successfully', HttpStatus.OK);
        } catch (error) {
          throw error;
        }
      }
    
      async updateEducation(education: EducationDTO): Promise<EducationEntity>{
          try {
              await this.educationRepository
              .createQueryBuilder()
              .update(education)
              .execute()

              throw new HttpException('Education saved successfully', HttpStatus.OK);
          } catch (error) {
              throw error;
          }
      }

      async deleteEducation(id: number): Promise<EducationEntity> {
        try {
          const education = await this.educationRepository
            .createQueryBuilder()
            .delete()
            .where('id = :id', { id })
            .execute();
    
          if (!education.affected)
            throw new HttpException(
              `Education with id: ${id} was not found`,
              HttpStatus.NOT_FOUND,
            );
          throw new HttpException('Education deleted successfully', HttpStatus.OK);
        } catch (error) {
          throw error;
        }
      }

      async createWorkExperience(experience: WorkExperienceDTO): Promise<WorkExperienceEntity> {
        try {
          await this.workExperienceRepository
            .createQueryBuilder()
            .insert()
            .values(experience)
            .execute();
    
          throw new HttpException('Work experience created successfully', HttpStatus.OK);
        } catch (error) {
          throw error;
        }
      }
    
      async updateWorkExperience(experience: WorkExperienceDTO): Promise<WorkExperienceEntity>{
          try {
              await this.workExperienceRepository
              .createQueryBuilder()
              .update(experience)
              .execute()

              throw new HttpException('Work experience saved successfully', HttpStatus.OK);
          } catch (error) {
              throw error;
          }
      }

      async deleteWorkExperience(id: number): Promise<WorkExperienceEntity> {
        try {
          const workExperience = await this.workExperienceRepository
            .createQueryBuilder()
            .delete()
            .where('id = :id', { id })
            .execute();
    
          if (!workExperience.affected)
            throw new HttpException(
              `Work experience with id: ${id} was not found`,
              HttpStatus.NOT_FOUND,
            );
          throw new HttpException('Work experience deleted successfully', HttpStatus.OK);
        } catch (error) {
          throw error;
        }
      }
}

import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileEntity } from './entities/profile.entity';
import { SkillsEntity } from '../vacancies/entities/skills.entity';
import { EducationEntity } from './entities/education.entity';
import { WorkExperienceEntity } from './entities/workExperience.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileEntity, SkillsEntity, EducationEntity, WorkExperienceEntity])],
  providers: [ProfileService],
  controllers: [ProfileController]
})
export class ProfileModule { }

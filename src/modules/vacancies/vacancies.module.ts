import { Module } from '@nestjs/common';
import { VacanciesController } from './vacancies.controller';
import { VacanciesService } from './vacancies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillsEntity } from './entities/skills.entity';
import { CategoriesEntity } from './entities/categories.entity';
import { VacanciesEntity } from './entities/vacancies.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SkillsEntity, CategoriesEntity, VacanciesEntity]),
  ],
  controllers: [VacanciesController],
  providers: [VacanciesService],
})
export class VacanciesModule { }

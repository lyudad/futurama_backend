import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SkillsEntity } from './entities/skills.entity';
import { CategoriesEntity } from './entities/categories.entity';
import { VacanciesEntity } from './entities/vacancies.entity';
import { SkillsDTO } from './dto/skills.dto';
import { CategoriesDTO } from './dto/categories.dto';
import { VacanciesDTO } from './dto/vacancies.dto';

@Injectable()
export class VacanciesService {
  constructor(
    @InjectRepository(SkillsEntity)
    private readonly skillsRepository: Repository<SkillsEntity>,
    @InjectRepository(CategoriesEntity)
    private readonly categoriesRepository: Repository<CategoriesEntity>,
    @InjectRepository(VacanciesEntity)
    private readonly vacanciesRepository: Repository<VacanciesEntity>,
  ) {}

  async createVacancy(Vacancy: VacanciesDTO): Promise<VacanciesEntity> {
    try {
      await this.vacanciesRepository
        .createQueryBuilder()
        .insert()
        .values(Vacancy)
        .execute();

      throw new HttpException('Done', HttpStatus.OK);
    } catch (error) {
      throw error;
    }
  }

  async deleteVacancy(id: VacanciesDTO): Promise<VacanciesEntity> {
    try {
      const vacancy = await this.vacanciesRepository
        .createQueryBuilder()
        .delete()
        .where('id = :id', { id })
        .execute();

      if (vacancy.affected === 0)
        throw new HttpException(
          `Vacancy with id: ${id} was not found`,
          HttpStatus.NOT_FOUND,
        );
      throw new HttpException('Done', HttpStatus.OK);
    } catch (error) {
      throw error;
    }
  }

  async getAllVacancies(): Promise<VacanciesEntity[]> {
    try {
      const vacancies = await this.vacanciesRepository
        .createQueryBuilder('vacancy')
        .leftJoinAndSelect('vacancy.category', 'category')
        .orderBy('vacancy.id')
        .getMany();
      if (!vacancies) throw new HttpException('400', HttpStatus.BAD_REQUEST);
      return vacancies;
    } catch (error) {
      throw new ConflictException(error.sqlMessage);
    }
  }

  async createSkill(Skill: SkillsDTO): Promise<SkillsEntity> {
    try {
      await this.skillsRepository
        .createQueryBuilder()
        .insert()
        .values(Skill)
        .execute();

      throw new HttpException('Done', HttpStatus.OK);
    } catch (error) {
      throw error;
    }
  }

  async deleteSkill(id: SkillsDTO): Promise<SkillsEntity> {
    try {
      const skill = await this.skillsRepository
        .createQueryBuilder()
        .delete()
        .where('id = :id', { id })
        .execute();

      if (skill.affected === 0)
        throw new HttpException(
          `Skill with id: ${id} was not found`,
          HttpStatus.NOT_FOUND,
        );
      throw new HttpException('Done', HttpStatus.OK);
    } catch (error) {
      throw error;
    }
  }

  async getAllSkills(): Promise<SkillsEntity[]> {
    try {
      const skills = await this.skillsRepository
        .createQueryBuilder()
        .orderBy('id')
        .getMany();
      if (!skills) throw new HttpException('400', HttpStatus.BAD_REQUEST);
      return skills;
    } catch (error) {
      error;
    }
  }

  async createCategory(Category: CategoriesDTO): Promise<CategoriesEntity> {
    try {
      await this.categoriesRepository
        .createQueryBuilder()
        .insert()
        .values(Category)
        .execute();

      throw new HttpException('Done', HttpStatus.OK);
    } catch (error) {
      throw error;
    }
  }

  async deleteCategory(id: CategoriesDTO): Promise<CategoriesEntity> {
    try {
      const category = await this.categoriesRepository
        .createQueryBuilder()
        .delete()
        .where('id = :id', { id })
        .execute();

      if (category.affected === 0)
        throw new HttpException(
          `Category with id: ${id} was not found`,
          HttpStatus.NOT_FOUND,
        );
      throw new HttpException('Done', HttpStatus.OK);
    } catch (error) {
      throw error;
    }
  }

  async getAllCategories(): Promise<CategoriesEntity[]> {
    try {
      const categories = await this.categoriesRepository
        .createQueryBuilder()
        .orderBy('id')
        .getMany();
      if (!categories) throw new HttpException('400', HttpStatus.BAD_REQUEST);
      return categories;
    } catch (error) {
      error;
    }
  }
}

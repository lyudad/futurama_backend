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
import { findVacanciesDTO } from './dto/findVacancies.dto';

@Injectable()
export class VacanciesService {
  constructor(
    @InjectRepository(SkillsEntity)
    private readonly skillsRepository: Repository<SkillsEntity>,
    @InjectRepository(CategoriesEntity)
    private readonly categoriesRepository: Repository<CategoriesEntity>,
    @InjectRepository(VacanciesEntity)
    private readonly vacanciesRepository: Repository<VacanciesEntity>,
  ) { }

  async createVacancy(Vacancy: VacanciesDTO): Promise<VacanciesEntity> {
    try {
      await this.vacanciesRepository.save({
        ...Vacancy, isActive: true,
        skills: Vacancy.skills.map((skill: number) => ({ id: skill })),
      });
      throw new HttpException('Done', HttpStatus.OK);
    } catch (error) {
      throw error;
    }
  }

  async changeVacancyStatus(id: number, status: boolean): Promise<void> {
    try {
      this.vacanciesRepository.update(id, { isActive: status });
    } catch (error) {
      throw error;
    }
  }

  async deleteVacancy(id: number): Promise<VacanciesEntity> {
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

  async findVacancies({
    title,
    categories,
    skills,
    englishLevel,
    minPrice,
    maxPrice,
    minTimePerWeek,
    maxTimePerWeek,
  }: findVacanciesDTO): Promise<VacanciesEntity[]> {
    try {
      let database = await this.vacanciesRepository
        .createQueryBuilder('vacancy')
        .where('vacancy.isActive = :status', { status: true })
        .leftJoinAndSelect('vacancy.category', 'category')
        .leftJoinAndSelect('vacancy.skills', 'skills')
        .leftJoinAndSelect('vacancy.owner', 'users');

      if (title) {
        database = database.andWhere('vacancy.title like :title', {
          title: `%${title}%`,
        });
      }
      if (categories?.length > 0) {
        database = database.andWhere('category.category IN (:...categories)', {
          categories,
        });
      }
      if (skills?.length > 0) {
        database = database.andWhere('skills.skill IN (:...skills)', {
          skills,
        });
      }
      if (englishLevel) {
        database = database.andWhere('vacancy.englishLevel = :englishLevel', {
          englishLevel,
        });
      }
      if (minPrice) {
        database = database.andWhere('vacancy.price >= :minPrice', {
          minPrice,
        });
      }
      if (maxPrice) {
        database = database.andWhere('vacancy.price <= :maxPrice', {
          maxPrice,
        });
      }
      if (minTimePerWeek) {
        database = database.andWhere('vacancy.timePerWeek >= :minTimePerWeek', {
          minTimePerWeek,
        });
      }
      if (maxTimePerWeek) {
        database = database.andWhere('vacancy.timePerWeek <= :maxTimePerWeek', {
          maxTimePerWeek,
        });
      }

      const vacancies = database.orderBy('vacancy.createdAt', 'DESC').getMany();
      if (!vacancies) throw new HttpException('400', HttpStatus.BAD_REQUEST);
      return vacancies;
    } catch (error) {
      throw new ConflictException(error);
    }
  }

  async getAllVacancies(): Promise<VacanciesEntity[]> {
    try {
      const vacancies = await this.vacanciesRepository
        .createQueryBuilder('vacancy')
        .leftJoinAndSelect('vacancy.category', 'category')
        .leftJoinAndSelect('vacancy.skills', 'skills')
        .leftJoinAndSelect('vacancy.owner', 'users')
        .orderBy('vacancy.createdAt', 'DESC')
        .getMany();
      if (!vacancies) throw new HttpException('400', HttpStatus.BAD_REQUEST);
      return vacancies;
    } catch (error) {
      throw error;
    }
  }

  async getVacancyWithMinPrice(): Promise<VacanciesEntity> {
    try {
      const vacancies = await this.vacanciesRepository
        .createQueryBuilder('vacancy')
        .leftJoinAndSelect('vacancy.category', 'category')
        .leftJoinAndSelect('vacancy.skills', 'skills')
        .leftJoinAndSelect('vacancy.owner', 'users')
        .orderBy('vacancy.price')
        .getOne();
      if (!vacancies) throw new HttpException('400', HttpStatus.BAD_REQUEST);
      return vacancies;
    } catch (error) {
      throw error;
    }
  }
  async getVacancyWithMaxPrice(): Promise<VacanciesEntity> {
    try {
      const vacancies = await this.vacanciesRepository
        .createQueryBuilder('vacancy')
        .leftJoinAndSelect('vacancy.category', 'category')
        .leftJoinAndSelect('vacancy.skills', 'skills')
        .leftJoinAndSelect('vacancy.owner', 'users')
        .orderBy('vacancy.price', 'DESC')
        .getOne();
      if (!vacancies) throw new HttpException('400', HttpStatus.BAD_REQUEST);
      return vacancies;
    } catch (error) {
      throw error;
    }
  }
  async getVacancyWithMinDuration(): Promise<VacanciesEntity> {
    try {
      const vacancies = await this.vacanciesRepository
        .createQueryBuilder('vacancy')
        .leftJoinAndSelect('vacancy.category', 'category')
        .leftJoinAndSelect('vacancy.skills', 'skills')
        .leftJoinAndSelect('vacancy.owner', 'users')
        .orderBy('vacancy.timePerWeek')
        .getOne();
      if (!vacancies) throw new HttpException('400', HttpStatus.BAD_REQUEST);
      return vacancies;
    } catch (error) {
      throw error;
    }
  }
  async getVacancyWithMaxDuration(): Promise<VacanciesEntity> {
    try {
      const vacancies = await this.vacanciesRepository
        .createQueryBuilder('vacancy')
        .leftJoinAndSelect('vacancy.category', 'category')
        .leftJoinAndSelect('vacancy.skills', 'skills')
        .leftJoinAndSelect('vacancy.owner', 'users')
        .orderBy('vacancy.timePerWeek', 'DESC')
        .getOne();
      if (!vacancies) throw new HttpException('400', HttpStatus.BAD_REQUEST);
      return vacancies;
    } catch (error) {
      throw error;
    }
  }

  async getVacancyById(id: number): Promise<VacanciesEntity> {
    try {
      const vacancy = await this.vacanciesRepository
        .createQueryBuilder('vacancy')
        .where('vacancy.id = :id', { id })
        .leftJoinAndSelect('vacancy.category', 'category')
        .leftJoinAndSelect('vacancy.skills', 'skills')
        .leftJoinAndSelect('vacancy.owner', 'users')
        .getOne();

      if (!vacancy) throw new HttpException('400', HttpStatus.BAD_REQUEST);
      return vacancy;
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

  async deleteSkill(id: number): Promise<SkillsEntity> {
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
        .orderBy('skill')
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

  async deleteCategory(id: number): Promise<CategoriesEntity> {
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

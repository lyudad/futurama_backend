import { Controller, Post, Delete, Get, Body, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SkillsDTO } from './dto/skills.dto';
import { CategoriesDTO } from './dto/categories.dto';
import { VacanciesDTO } from './dto/vacancies.dto';
import { VacanciesService } from './vacancies.service';
import { VacanciesEntity } from './entities/vacancies.entity';
import { findVacanciesDTO } from './dto/findVacancies.dto';

@ApiTags('Create vacancies')
@Controller('search_work')
export class VacanciesController {
  constructor(private readonly vacanciesService: VacanciesService) {}

  @ApiOperation({ summary: 'Creating vacancy' })
  @ApiResponse({ status: 201, type: VacanciesDTO })
  @Post('add_vacancy')
  async createVacancy(@Body() body: VacanciesDTO): Promise<void> {
    try {
      await this.vacanciesService.createVacancy(body);
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: 'Delete vacancy' })
  @ApiResponse({ status: 200, type: VacanciesDTO })
  @Delete('vacancies')
  async deleteVacancy(@Body() body: VacanciesDTO): Promise<void> {
    try {
      await this.vacanciesService.deleteVacancy(body.id);
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: 'Find vacancies by query' })
  @ApiResponse({ status: 200, type: findVacanciesDTO })
  @Post('vacancies')
  async getVacanciesByQuery(
    @Body() body: findVacanciesDTO,
  ): Promise<VacanciesEntity[]> {
    try {
      const vacancies = await this.vacanciesService.findVacancies(body);
      return vacancies;
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: 'Find vacancy with min price' })
  @ApiResponse({ status: 200, type: findVacanciesDTO })
  @Get('vacancy_with_min_price')
  async getVacancyWithMinPrice(): Promise<VacanciesEntity> {
    try {
      const vacancies = await this.vacanciesService.getVacancyWithMinPrice();
      return vacancies;
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: 'Find vacancy with max price' })
  @ApiResponse({ status: 200, type: findVacanciesDTO })
  @Get('vacancy_with_max_price')
  async getVacancyWithMaxPrice(): Promise<VacanciesEntity> {
    try {
      const vacancies = await this.vacanciesService.getVacancyWithMaxPrice();
      return vacancies;
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: 'Find vacancy with min duration' })
  @ApiResponse({ status: 200, type: findVacanciesDTO })
  @Get('vacancy_with_min_duration')
  async getVacancyWithMinDuration(): Promise<VacanciesEntity> {
    try {
      const vacancies = await this.vacanciesService.getVacancyWithMinDuration();
      return vacancies;
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: 'Find vacancy with min duration' })
  @ApiResponse({ status: 200, type: findVacanciesDTO })
  @Get('vacancy_with_max_duration')
  async getVacancyWithMaxDuration(): Promise<VacanciesEntity> {
    try {
      const vacancies = await this.vacanciesService.getVacancyWithMaxDuration();
      return vacancies;
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: 'Getting vacancy by ID' })
  @ApiResponse({ status: 200, type: VacanciesDTO })
  @Get('vacancies/:id')
  async getVacancyById(@Param('id') id: number): Promise<VacanciesEntity> {
    try {
      return await this.vacanciesService.getVacancyById(id);
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: 'Creating skill' })
  @ApiResponse({ status: 201, type: SkillsDTO })
  @Post('skills')
  async createSkill(@Body() body: SkillsDTO): Promise<void> {
    try {
      await this.vacanciesService.createSkill(body);
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: 'Delete skill' })
  @ApiResponse({ status: 200, type: SkillsDTO })
  @Delete('skills')
  async deleteSkill(@Body() body: SkillsDTO): Promise<void> {
    try {
      await this.vacanciesService.deleteSkill(body.id);
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: 'Getting all skills' })
  @ApiResponse({ status: 200, type: SkillsDTO })
  @Get('skills')
  async getAllSkills(): Promise<SkillsDTO[]> {
    try {
      const skills = await this.vacanciesService.getAllSkills();
      return skills;
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: 'Creating category' })
  @ApiResponse({ status: 201, type: CategoriesDTO })
  @Post('categories')
  async createCategory(@Body() body: CategoriesDTO): Promise<void> {
    try {
      await this.vacanciesService.createCategory(body);
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: 'Delete category' })
  @ApiResponse({ status: 200, type: CategoriesDTO })
  @Delete('categories')
  async deleteCategory(@Body() body: CategoriesDTO): Promise<void> {
    try {
      await this.vacanciesService.deleteCategory(body.id);
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: 'Getting all categories' })
  @ApiResponse({ status: 200, type: CategoriesDTO })
  @Get('categories')
  async getAllCategories(): Promise<CategoriesDTO[]> {
    try {
      const users = await this.vacanciesService.getAllCategories();
      return users;
    } catch (error) {
      throw error;
    }
  }
}

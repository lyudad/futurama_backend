import { Controller, Post, Delete, Get, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SkillsDTO } from './dto/skills.dto';
import { CategoriesDTO } from './dto/categories.dto';
import { VacanciesDTO } from './dto/vacancies.dto';
import { VacanciesService } from './vacancies.service';

@ApiTags('Create vacancies')
@Controller('search_work')
export class VacanciesController {
  constructor(private readonly vacanciesService: VacanciesService) {}

  @ApiOperation({ summary: 'Creating vacancy' })
  @ApiResponse({ status: 201, type: VacanciesDTO })
  @Post('vacancies')
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
  async deleteVacancy(@Body() body: any): Promise<void> {
    try {
      await this.vacanciesService.deleteVacancy(body.id);
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: 'Getting all vacancies' })
  @ApiResponse({ status: 200, type: VacanciesDTO })
  @Get('vacancies')
  async getAllVacancies(): Promise<any[]> {
    try {
      const vacancies = await this.vacanciesService.getAllVacancies();
      return vacancies;
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
  async deleteSkill(@Body() body: any): Promise<void> {
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
  async deleteCategory(@Body() body: any): Promise<void> {
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

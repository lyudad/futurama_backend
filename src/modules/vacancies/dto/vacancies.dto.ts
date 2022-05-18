import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CategoriesEntity } from '../entities/categories.entity';

export class VacanciesDTO {
  @ApiProperty({ example: '1', description: 'id' })
  @IsNotEmpty()
  id: number;

  @ApiProperty({ example: 'Development', description: 'category_id' })
  @IsNotEmpty()
  categoryId: CategoriesEntity;

  @ApiProperty({ example: 'JS, Nestjs', description: 'skills' })
  @IsNotEmpty()
  skills: [];

  @ApiProperty({ example: '1', description: 'owner_id' })
  @IsNotEmpty()
  ownerId: number;

  @ApiProperty({ example: 'Junior js developer', description: 'title' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Very good project', description: 'description' })
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'Entermediate', description: 'english level' })
  @IsNotEmpty()
  englishLevel: string;

  @ApiProperty({ example: '1000', description: 'price' })
  @IsNotEmpty()
  price: number;

  @ApiProperty({ example: '40', description: 'time per week' })
  @IsNotEmpty()
  timePerWeek: number;
}

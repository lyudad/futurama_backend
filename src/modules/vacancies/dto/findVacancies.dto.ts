import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class findVacanciesDTO {
  @ApiProperty({ example: 'Junior js developer', description: 'title' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: '["Development", "Project Managment"]',
    description: 'categories',
  })
  @IsNotEmpty()
  categories: [string];

  @ApiProperty({ example: 'JS, Nestjs', description: 'skills' })
  @IsNotEmpty()
  skills: [string];

  @ApiProperty({ example: 'Intermediate', description: 'english level' })
  @IsNotEmpty()
  englishLevel: string;

  @ApiProperty({ example: '1000', description: 'min price' })
  @IsNotEmpty()
  minPrice: number;

  @ApiProperty({ example: '4000', description: 'max price' })
  @IsNotEmpty()
  maxPrice: number;

  @ApiProperty({ example: '40', description: 'min time per week' })
  @IsNotEmpty()
  minTimePerWeek: number;

  @ApiProperty({ example: '80', description: 'max time per week' })
  @IsNotEmpty()
  maxTimePerWeek: number;
}

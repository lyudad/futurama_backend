import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/modules/user/user.entity';
import { CategoriesEntity } from 'src/modules/vacancies/entities/categories.entity';

export class ProfileDTO {
  @ApiProperty({ example: '1', description: 'id' })
  id?: number;

  @ApiProperty({ example: 'advanced', description: 'English level' })
  @IsNotEmpty()
  englishLevel: string;

  @ApiProperty({ example: '40', description: 'Desireble salary level' })
  @IsNotEmpty()
  desirebleSalaryLevel: number;

  @ApiProperty({ example: '8', description: 'Available amount of hours' })
  @IsNotEmpty()
  availableAmountOfHours: number;

  @ApiProperty({ example: 'Type your other experiences', description: 'Other experiences' })
  @IsNotEmpty()
  otherExperience: string;

  @ApiProperty({ example: 'Describe about yourself', description: 'Description' })
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: '1', description: 'Position id' })
  @IsNotEmpty()
  position: CategoriesEntity;

  @ApiProperty({ example: '1', description: 'User id' })
  @IsNotEmpty()
  user: UserEntity;

  @ApiProperty({ example: '[1, 2]', description: 'Skills array' })
  @IsNotEmpty()
  skills: [];
}

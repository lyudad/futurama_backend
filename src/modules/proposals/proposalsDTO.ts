import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { UserEntity } from '../user/user.entity';
import { VacanciesEntity } from '../vacancies/entities/vacancies.entity';


export class ProposalsDTO {
  @IsNotEmpty()
  user: UserEntity;

  @IsNotEmpty()
  vacancy: VacanciesEntity;

  @ApiProperty({ example: '54', description: 'price' })
  @IsNotEmpty()
  price: number;

  @ApiProperty({ example: 'Lorem ipsum dolor sit amet', description: 'Letter' })
  @IsNotEmpty()
  coverLetter: string;

  @ApiProperty({ example: 'Pending', description: 'Status of proposal' })
  @IsNotEmpty()
  status: string;

  @ApiProperty({ example: 'Invite', description: 'Type of proposal' })
  @IsNotEmpty()
  type: string;
}

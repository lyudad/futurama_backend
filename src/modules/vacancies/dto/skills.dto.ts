import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SkillsDTO {
  @ApiProperty({ example: '1', description: 'id' })
  @IsNotEmpty()
  id: number;

  @ApiProperty({ example: 'JS', description: 'skill' })
  @IsNotEmpty()
  skill: string;
}

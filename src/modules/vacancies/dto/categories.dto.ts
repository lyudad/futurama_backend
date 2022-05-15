import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CategoriesDTO {
  @ApiProperty({ example: '1', description: 'id' })
  @IsNotEmpty()
  id: number;

  @ApiProperty({ example: 'development', description: 'category' })
  @IsNotEmpty()
  category: string;
}

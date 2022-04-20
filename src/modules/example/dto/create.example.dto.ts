import { ApiProperty } from '@nestjs/swagger';

export class CreateExampleDto {
  @ApiProperty({ example: '1', description: 'id' })
  id: number;

  @ApiProperty({ example: 'qwert@gmail.com', description: 'email' })
  email: string;

  @ApiProperty({ example: '111111', description: 'password' })
  password: string;
}

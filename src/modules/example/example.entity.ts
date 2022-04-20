import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class ExampleUser {
  @ApiProperty({ example: '1', description: 'Unique identificator' })
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ApiProperty({ example: 'qwerty@gmail.com', description: 'email' })
  @Column({ type: 'varchar', width: 50, unique: true })
  email: string;

  @ApiProperty({ example: '111111', description: 'password' })
  @Column({ type: 'varchar', width: 50 })
  password: string;
}

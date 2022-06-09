import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../user/user.entity';

export class ContractsDTO {
    @ApiProperty({ example: '1', description: 'id' })
    id?: number;

    @ApiProperty({ example: 'Nodejs backend', description: 'Job title' })
    @IsNotEmpty()
    title: string;

    @ApiProperty({ example: '20', description: 'Hourly date' })
    @IsNotEmpty()
    hourlyRate: number;

    @ApiProperty({ example: 'About job contract', description: 'Contract description' })
    @IsNotEmpty()
    description: string;

    @ApiProperty({ example: '20.12.2020', description: 'Start date' })
    @IsNotEmpty()
    start: Date;

    @ApiProperty({ example: '12.02.2025', description: 'End date' })
    @IsNotEmpty()
    end: Date;

    @ApiProperty({ example: '0', description: 'Contract is active?' })
    @IsNotEmpty()
    active: boolean;

    @ApiProperty({ example: '1', description: 'Freelancer id' })
    @IsNotEmpty()
    freelancer: UserEntity;

    @ApiProperty({ example: '2', description: 'Job owner id'})
    @IsNotEmpty()
    owner: UserEntity;
}

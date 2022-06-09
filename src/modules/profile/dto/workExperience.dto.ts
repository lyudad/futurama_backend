import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ProfileEntity } from '../entities/profile.entity';

export class WorkExperienceDTO {
    @ApiProperty({ example: '1', description: 'id' })
    id?: number;

    @ApiProperty({ example: 'Zenbit', description: 'company' })
    @IsNotEmpty()
    company: string;

    @ApiProperty({ example: 'Fullstack developer', description: 'Position' })
    @IsNotEmpty()
    position: string;

    @ApiProperty({ example: '20.12.2020', description: 'Start date' })
    @IsNotEmpty()
    start: Date;

    @ApiProperty({ example: '12.02.2025', description: 'End date' })
    @IsNotEmpty()
    end: Date;

    @ApiProperty({ example: 'About company', description: 'Description' })
    @IsNotEmpty()
    description: string;

    @ApiProperty({ example: '1', description: 'Profile id' })
    @IsNotEmpty()
    profile: ProfileEntity;
}

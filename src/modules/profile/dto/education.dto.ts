import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ProfileEntity } from '../entities/profile.entity';

export class EducationDTO {
    @ApiProperty({ example: '1', description: 'id' })
    id?: number;

    @ApiProperty({ example: 'Oxford', description: 'Establishment' })
    @IsNotEmpty()
    establishment: string;

    @ApiProperty({ example: 'Bachelour', description: 'Level' })
    @IsNotEmpty()
    level: string;

    @ApiProperty({ example: '20.12.2020', description: 'Start date' })
    @IsNotEmpty()
    start: Date;

    @ApiProperty({ example: '12.02.2025', description: 'End date' })
    @IsNotEmpty()
    end: Date;

    @ApiProperty({ example: '1', description: 'Profile id' })
    @IsNotEmpty()
    profile: ProfileEntity;
}

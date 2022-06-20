import { Controller, Headers, Get, HttpException, HttpStatus, Post, Body, Param, Delete, Put, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { encodeJwt } from 'src/utils/jwt';
import { EducationDTO } from './dto/education.dto';
import { ProfileDTO } from './dto/profile.dto';
import { WorkExperienceDTO } from './dto/workExperience.dto';
import { ProfileEntity } from './entities/profile.entity';
import { ProfileService } from './profile.service';
import { Request } from 'express';

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
    constructor(private profileService: ProfileService) { }
    @Get('')
    getMyProfile(@Headers() headers): Promise<object> {
        if (!headers.token) {
            throw new HttpException(
                'Unauthorized',
                HttpStatus.UNAUTHORIZED,
            );
        } else {
            return this.profileService.getProfile(encodeJwt(headers.token));
        }
    }

    @ApiOperation({ summary: 'Update profile' })
    @ApiResponse({ status: 201, type: ProfileDTO })
    @Post('update')
    async createVacancy(@Body() body: ProfileDTO): Promise<void> {
        try {
            await this.profileService.setProfile(body);
        } catch (error) {
            throw error;
        }
    }

    @ApiOperation({ summary: 'Create education' })
    @ApiResponse({ status: 201, type: EducationDTO })
    @Post('education/create')
    async createEducation(@Body() body: EducationDTO): Promise<void> {
        try {
            await this.profileService.createEducation(body);
        } catch (error) {
            throw error;
        }
    }

    @ApiOperation({ summary: 'Update education' })
    @ApiResponse({ status: 201, type: EducationDTO })
    @Put('education/update')
    async updateEducation(@Body() body: EducationDTO): Promise<void> {
        try {
            await this.profileService.updateEducation(body);
        } catch (error) {
            throw error;
        }
    }

    @ApiOperation({ summary: 'Delete education' })
    @ApiResponse({ status: 201, type: EducationDTO })
    @Delete('education/delete/:id')
    async deleteEducation(@Param('id') id: number): Promise<void> {
        try {
            await this.profileService.deleteEducation(id);
        } catch (error) {
            throw error;
        }
    }

    @ApiOperation({ summary: 'Create work experience' })
    @ApiResponse({ status: 201, type: WorkExperienceDTO })
    @Post('experience/create')
    async createWorkExperience(@Body() body: WorkExperienceDTO): Promise<void> {
        try {
            await this.profileService.createWorkExperience(body);
        } catch (error) {
            throw error;
        }
    }

    @ApiOperation({ summary: 'Update work experience' })
    @ApiResponse({ status: 201, type: WorkExperienceDTO })
    @Put('experience/update')
    async updateWorkExperience(@Body() body: WorkExperienceDTO): Promise<void> {
        try {
            await this.profileService.updateWorkExperience(body);
        } catch (error) {
            throw error;
        }
    }

    @ApiOperation({ summary: 'Delete work experience' })
    @ApiResponse({ status: 201, type: WorkExperienceDTO })
    @Delete('experience/delete/:id')
    async deleteWorkExperience(@Param('id') id: number): Promise<void> {
        try {
            await this.profileService.deleteWorkExperience(id);
        } catch (error) {
            throw error;
        }
    }

    @ApiOperation({ summary: 'Get all profiles' })
    @Get('all')
    async getProfilesForCurrentOwner(@Req() req: Request): Promise<ProfileEntity[]> {
        return this.profileService.getProfilesForOwner(req);
    }

    @ApiOperation({ summary: 'Get profile by ID' })
    @Get('/:id')
    getProfileById(@Param('id') id: number): Promise<object> {
        return this.profileService.getProfile(id);
    }
}

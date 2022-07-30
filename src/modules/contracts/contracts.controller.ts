    import { Body, Headers, Controller, Get, Post, Put, HttpException, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { encodeJwt } from 'src/utils/jwt';
import { UserDTO } from '../user/dto/user.login';
import { ContractsDTO } from './contracts.dto';
import { ContractsService } from './contracts.service';

@ApiTags('Contracts')
@Controller('contracts')
export class ContractsController {
    constructor(private contractsService: ContractsService) { }

    @ApiOperation({ summary: 'Get freelancer contracts'})
    @ApiResponse({ status: 201, type: UserDTO })
    @Get('freelancer')
    async getFreelancerContracts(@Headers() headers): Promise<ContractsDTO[]> {
        try {
            if(!headers.token){
                throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED,);
            }
            return this.contractsService.getFreelancerContracts(encodeJwt(headers.token));
        } catch (error) {
            throw error;
        }
    }

    @ApiOperation({ summary: 'Get owner contracts'})
    @ApiResponse({ status: 201, type: UserDTO })
    @Get('owner')
    async getOwnerContracts(@Headers() headers): Promise<ContractsDTO[]> {
        try {
            if(!headers.token){
                throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED,);
            }
            return this.contractsService.getJobOwnerContracts(encodeJwt(headers.token));
        } catch (error) {
            throw error;
        }
    }

    @ApiOperation({ summary: 'Create contract' })
    @ApiResponse({ status: 201, type: ContractsDTO })
    @Post('create')
    async createEducation(@Body() body: ContractsDTO): Promise<void> {          
        try {
        await this.contractsService.createContract(body);
        } catch (error) {
        throw error;
        }
    }

    @ApiOperation({ summary: 'Update contract' })
    @ApiResponse({ status: 201, type: ContractsDTO })
    @Put('update')
    async updateEducation(@Body() body): Promise<void> {  
        try {
        await this.contractsService.updateContract(body);
        } catch (error) {
        throw error;
        }
    }
}

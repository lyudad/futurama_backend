import {
    Body,
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { UploadDto } from './upload.dto';
import { UploadService } from './upload.service';


@Controller('user')
export class UploadController {
    constructor(private readonly UploadService: UploadService) { }



    @UseInterceptors(FileInterceptor('file'))
    @Post('upload')
    uploadFile(
        @Body() body: UploadDto,
        @UploadedFile() file: Express.Multer.File,
    ) { console.log(body)
        return {
            body,
            file: file.buffer.toString(),
        };
    }
}
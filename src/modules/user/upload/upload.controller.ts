import { Controller, Get, Post, UseInterceptors, UploadedFile, Res, Param, HttpStatus, Req } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { InjectRepository } from '@nestjs/typeorm';
import { Response, Request } from 'express';
import { diskStorage } from 'multer';
import { Repository } from 'typeorm';

import { UserEntity } from '../user.entity';
import { editFileName, imageFileFilter } from './utils/file-upload.utils';
import { ContactsService } from '../contact-info/contacts.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Upload photo')
@Controller('upload')
export class FilesController {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) { }

  @Post()
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )

  async uploadedFile(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    const photoUrl = process.env.URL + file.filename;
    try {
      await this.usersRepository.update(ContactsService.extractId(req), { photo: photoUrl });
      return {
        photoUrl,
      };
    } catch { throw new Error(); }

  }

  @Get(':imagename')
  getImage(@Param('imagename') image: string, @Res() res: Response) {
    try {
      const response = res.sendFile(image, { root: './uploads' });
      return {
        status: HttpStatus.OK,
        data: response,
      };
    } catch { throw new Error(); }
  }
}
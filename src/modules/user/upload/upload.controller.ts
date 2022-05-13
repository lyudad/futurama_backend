import { Controller, Get, Post, UseInterceptors, UploadedFile, Res, Param, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { InjectRepository } from '@nestjs/typeorm';
import { diskStorage } from 'multer';
import { Repository } from 'typeorm';
import { UserEntity } from '../user.entity';
import { editFileName, imageFileFilter } from './utils/file-upload.utils';


@Controller('upload')
export class FilesController {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) { }

  @Post(':id')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )

  async uploadedFile(@UploadedFile() file, @Param('id') id: string) {
    const photoUrl = 'https://futurama.cf/upload/' + file.filename;

    await this.usersRepository.update(id, { photo: photoUrl });
    
    return {
      status: HttpStatus.OK,
      message: 'Image uploaded successfully!',
      photoUrl,
    };
  }


  @Get(':imagename')
  getImage(@Param('imagename') image, @Res() res) {
    const response = res.sendFile(image, { root: './uploads' });
    return {
      status: HttpStatus.OK,
      data: response,
    };
  }
}

 // @Post()
  // create(
  //   @Body() body: {
  //     firstname: string;
  //     lastname: string;
  //     email: string;
  //     phone: string;
  //     token: string;
  //     photo: any;
  //   },
  // ) {
  //   return body.firstname + 'https://futurama.cf/upload/';
  // }
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user.entity';
import { FilesController } from './upload.controller';

@Module({
  providers: [],
  controllers: [FilesController],
  imports: [TypeOrmModule.forFeature([UserEntity])],
  exports: [TypeOrmModule]
})
export class UploadModule { }

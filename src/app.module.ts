import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { UserEntity } from './modules/user/user.entity';
import { PasswordResetModule } from './modules/password-reset/password-reset.module';
import { MailModule } from './modules/mail/mail.module';
import { UploadModule } from './modules/user/upload/upload.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [UserEntity],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UserModule,

    PasswordResetModule,

    MailModule,

    UploadModule
  ],
})
export class AppModule {}

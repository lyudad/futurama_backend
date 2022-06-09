import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function start(): Promise<void> {
  const PORT = process.env.PORT || 8000;
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle('Futurama team')
    .setDescription('Job search website documentation')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  // eslint-disable-next-line no-console
  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}
start();

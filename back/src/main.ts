import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const prefix = 'api/v1';

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(prefix);

  const config = new DocumentBuilder()
  .setTitle('IFriends')
  .setDescription('The cats IFriends description')
  .setVersion('1.0')
  .addTag('ifriends')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(prefix, app, document);

  await app.listen(3001);
}

bootstrap();

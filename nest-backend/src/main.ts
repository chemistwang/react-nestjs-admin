import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { LoggingInterceptor } from './common/interceptor/logging.interceptor';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  // const appOptions = {
  //   cors: true
  // }
  // const app = await NestFactory.create(AppModule, appOptions);

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // app.setGlobalPrefix('api');

  // swagger
  const options = new DocumentBuilder()
    .setTitle('NestJS Example App of Chemputer')
    .setDescription('The Chemputer API description')
    .setVersion('1.0')
    .addTag('cats')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new TransformInterceptor(),
  );

  await app.listen(3333);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerConfig, customOptions } from './swagger-ui';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // setup swagger-ui
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document, customOptions);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(5000);
  console.log('App is listening on port: 5000');
}

bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // configure swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Edu Server')
    .setDescription('Edu Server API documentation')
    .setVersion('0.0.1')
    .setContact(
      'Code for Cause',
      'https://codeforcause.org/',
      'team@codeforcause.org',
    )
    .setLicense(
      'MIT',
      'https://github.com/codeforcauseorg/edu-server/blob/master/LICENSE',
    )
    .addServer('http://localhost:5000/', 'Development Server')
    .addBearerAuth()
    .build();

  // adding custom options
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Edu Server API Docs',
    customfavIcon: 'https://codeforcause.org/favicon.ico',
  };
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document, customOptions);

  await app.listen(5000);
  console.log('App is listening on port: 5000');
}

bootstrap();

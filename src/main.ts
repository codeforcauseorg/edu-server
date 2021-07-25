import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerConfig, customOptions } from './swagger-ui';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as helmet from 'helmet';
import { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';
import firebaseAccountCredentials from './config/firebase';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // setup swagger-ui
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document, customOptions);

  // Firebase Initialisation
  admin.initializeApp(firebaseAccountCredentials);

  app.enableCors();
  app.use(helmet());

  // The Cors handling middleware
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Headers', '*');
    res.set('Access-Control-Allow-Methods', '*');
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
    next();
  });
  app.useGlobalPipes(new ValidationPipe());

  const PORT = process.env.PORT || 5000;
  await app.listen(PORT);
  console.log('App is listening on port:', PORT);
}

bootstrap();
export default admin;

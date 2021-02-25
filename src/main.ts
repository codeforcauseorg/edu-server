import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as functions from 'firebase-functions';
import { UserGenModule } from './usergen/usergen.module';

async function createFunction(expressInstance) {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );

  await app.init();
}

async function createUserApp() {
  const userApp = await NestFactory.create(UserGenModule);
  await userApp.init();
  return userApp;
}

const expressServer = express();
createFunction(expressServer);

export const api = functions
  .region('europe-west1')
  .https.onRequest(async (request, response) => {
    expressServer(request, response);
  });

export const createUser = functions.auth.user().onCreate((user) => {
  let userApp = createUserApp();
  userApp.then(app => {
    console.log("User created");
    console.log(app);
  });
});

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

async function createFunction(expressInstance) {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );

  await app.init();
}

const expressServer = express();
createFunction(expressServer);

export const api = functions
  .region('europe-west1')
  .https.onRequest(async (request, response) => {
    expressServer(request, response);
  });

const usersCollection = admin.firestore().collection('users');
export const saveUser = functions.auth.user().onCreate((user) => {
  const userRef = usersCollection.doc(user.uid);
  const data = {
    name: user.displayName,
    email: user.email,
    emailVerified: user.emailVerified,
    photoURL: user.photoURL,
    applications: {},
  };
  userRef.set(data);
  return data;
});

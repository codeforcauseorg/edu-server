import admin from 'firebase-admin';
import firebaseAccountCredentials from './service';
import * as dotenv from 'dotenv';
dotenv.config();

/*const serviceAccount = firebaseAccountCredentials[
  process.env.NODE_ENV
] as admin.ServiceAccount;

export default {
  credential: admin.credential.cert(serviceAccount),
};
*/

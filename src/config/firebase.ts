import admin from 'firebase-admin';

import * as firebaseAccountCredentials from './service.json';

const serviceAccount = firebaseAccountCredentials as admin.ServiceAccount;

export default {
  credential: admin.credential.cert(serviceAccount),
};

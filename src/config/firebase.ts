import admin from 'firebase-admin';

// replace it with {example.service.json} for starting the project without firebase credential
import * as firebaseAccountCredentials from './service.json';

const serviceAccount = firebaseAccountCredentials as admin.ServiceAccount;

export default {
  credential: admin.credential.cert(serviceAccount),
};

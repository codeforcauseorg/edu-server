import admin from 'firebase-admin';

// replace it with {example.service.json} for starting the project without firebase credential
import firebaseAccountCredentials from './service';

const serviceAccount = firebaseAccountCredentials[process.env.NODE_ENV] as admin.ServiceAccount;

export default {
  credential: admin.credential.cert(serviceAccount),
};

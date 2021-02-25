import { Inject, Injectable } from '@nestjs/common';
import {
  FirebaseAdminSDK,
  FIREBASE_ADMIN_INJECT,
} from '@tfarras/nestjs-firebase-admin';

@Injectable()
export class UserGenService {
  private usersCollection;
  constructor(
    @Inject(FIREBASE_ADMIN_INJECT) private readonly fireSDK: FirebaseAdminSDK,
  ) {
    this.usersCollection = fireSDK.firestore().collection('users');
  }

  async createUser(user): Promise<any> {
    const userRef = this.usersCollection.doc(user.uid);
    const data = {
      name: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified,
      photoURL: user.photoURL,
      applications: {},
    };
    userRef.set(data);
    return data;
  }
}

import { Inject, Injectable } from '@nestjs/common';
import {
  FirebaseAdminSDK,
  FIREBASE_ADMIN_INJECT,
} from '@tfarras/nestjs-firebase-admin';

@Injectable()
export class LeadersService {
  private leadersCollection;

  constructor(
    @Inject(FIREBASE_ADMIN_INJECT) private readonly fireSDK: FirebaseAdminSDK,
  ) {
    this.leadersCollection = fireSDK.firestore().collection('leaders');
  }

  async getLeaders(): Promise<any> {
    let result = await this.leadersCollection.get();
    const output = [];
    result.docs.forEach(element => {
      output.push(element.data());
    });

    return output;
  }
}

import admin from 'firebase-admin';
import { ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class Auth {
  async Auth(req) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.split(' ')[0] === 'Bearer') {
      req.authToken = authHeader.split(' ')[1];
    } else {
      req.authToken = null;
    }
    try {
      const { authToken } = req;
      const userInfo = await admin.auth().verifyIdToken(authToken);
      req.body.owner = userInfo.uid;
      return userInfo;
    } catch (e) {
      throw new ForbiddenException();
    }
  }
}

@Injectable()
export class adminAuth {
  async Auth(req) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.split(' ')[0] === 'Bearer') {
      req.authToken = authHeader.split(' ')[1];
    } else {
      req.authToken = null;
    }
    try {
      const { authToken } = req;
      const userInfo = await admin.auth().verifyIdToken(authToken);
      req.body.owner = userInfo.uid;
      req.email = userInfo.email;
      return userInfo;
    } catch (e) {
      throw new ForbiddenException();
    }
  }
}

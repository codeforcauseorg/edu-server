import admin from 'firebase-admin';
import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class Auth {
  async Auth(req, next) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.split(' ')[0] === 'Bearer') {
      req.authToken = authHeader.split(' ')[1];
    } else {
      req.authToken = null;
    }
    try {
      const { authToken } = req;
      if (!authToken) {
        const err = new ForbiddenException(
          'Unauthorized - missing token in tokencheck',
        );
        next(err);
        return;
      }
      const userInfo = await admin.auth().verifyIdToken(authToken);
      req.body.user = userInfo.uid;
      return userInfo;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}

@Injectable()
export class adminAuth {
  async Auth(req, next) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.split(' ')[0] === 'Bearer') {
      req.authToken = authHeader.split(' ')[1];
    } else {
      req.authToken = null;
    }
    try {
      const { authToken } = req;
      if (!authToken) {
        const err = new ForbiddenException(
          'Unauthorized - missing token in tokencheck',
        );
        next(err);
        return;
      }
      const userInfo = await admin.auth().verifyIdToken(authToken);
      req.body.user = userInfo.uid;
      req.email = userInfo.email;
      return userInfo;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}

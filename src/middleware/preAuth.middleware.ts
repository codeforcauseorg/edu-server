import { ConflictException, Injectable, NestMiddleware } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument as User } from '../modules/user/schema/user.schema';
import { NextFunction, Request, Response } from 'express';
import admin from '../main';
import { Model } from 'mongoose';
import { Role } from '../roles/role.enum';

@Injectable()
export class PreauthMiddleware implements NestMiddleware {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (token && token != null && token != '' && token.length > 0) {
      admin
        .auth()
        .verifyIdToken(token.replace('Bearer ', ''))
        .then(async (decodedToken) => {
          const { email, uid, picture } = decodedToken;

          const userExists = await this.userModel
            .findOne({ email: email })
            .lean();

          let role;

          if (userExists) {
            role = userExists.role || Role.STUDENT;
          } else {
            const newUser = new this.userModel({
              email,
              fid: uid,
              role: Role.STUDENT,
              photoUrl: picture,
            });
            await newUser.save();
            role = Role.STUDENT;
            console.log(role);
          }

          const user = {
            email: email,
            fId: uid,
            role: role,
          };

          req['user'] = user;
          next();
        })
        .catch((error) => {
          if (error.errorInfo.code == 'auth/id-token-expired') {
            this.accessDenied(req.url, res, undefined, error.errorInfo);
          } else {
            this.accessDenied(
              req.url,
              res,
              error.errorInfo.message,
              error.errorInfo,
            );
          }
        });
    } else {
      throw new ConflictException('Access Denied as Token does not exist');
    }
  }

  private accessDenied(
    url: string,
    res: Response,
    message: string,
    others?: any,
  ) {
    res.status(403).json({
      statusCode: 403,
      timestamp: new Date().toISOString(),
      path: url,
      message: message ? message : 'Access Denied',
      ...others,
    });
  }
}

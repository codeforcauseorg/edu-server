import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  FirebaseAdminSDK,
  FIREBASE_ADMIN_INJECT,
} from '@tfarras/nestjs-firebase-admin';
import { AppService } from './app.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(FIREBASE_ADMIN_INJECT) private readonly fireSDK: FirebaseAdminSDK,
  ) {}

  @Get()
  @UseGuards(AuthGuard('firebase'))
  getHello() {
    return this.fireSDK.auth().listUsers();
  }

  @Get('/hello')
  getHey(@Req() request: Request): string {
    return 'Hello ' + request['user']?.email + '!';
  }
}

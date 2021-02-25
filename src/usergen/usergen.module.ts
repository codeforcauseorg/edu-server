import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { FirebaseModule } from '../firebase/firebase.module';
import * as path from 'path';
import { UserGenService } from './usergen.service';
 
@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, 'config', '**', '!(*.d).{ts,js}')),
    FirebaseModule,
  ],
  providers: [UserGenService],
})
export class UserGenModule { }
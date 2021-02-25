import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LeadersModule } from './leaders/leaders.module';
import { FirebaseModule } from './firebase/firebase.module';
import * as path from 'path';
 
@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, 'config', '**', '!(*.d).{ts,js}')),
    FirebaseModule,
    AuthModule,
    LeadersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
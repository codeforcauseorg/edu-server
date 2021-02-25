import { FirebaseAdminCoreModule } from '@tfarras/nestjs-firebase-admin';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import * as path from 'path';
 
@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, 'config', '**', '!(*.d).{ts,js}')),
    FirebaseAdminCoreModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('firebase'),
      inject: [ConfigService],
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
import { Module } from '@nestjs/common';
import { FirebaseAdminModule } from '@tfarras/nestjs-firebase-admin';
import { ConfigModule, ConfigService } from 'nestjs-config';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.load(
      path.resolve(__dirname, 'config', '**', '!(*.d).{ts,js}'),
    ),
    FirebaseAdminModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('firebase'),
      inject: [ConfigService],
    }),
  ],
})
export class FirebaseModule {}

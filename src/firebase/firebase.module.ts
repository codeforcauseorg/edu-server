import { Module } from '@nestjs/common';
import { FirebaseAdminCoreModule } from '@tfarras/nestjs-firebase-admin';
import { ConfigModule, ConfigService } from 'nestjs-config';
import * as path from 'path';

@Module({
    imports: [
        ConfigModule.load(path.resolve(__dirname, 'config', '**', '!(*.d).{ts,js}')),
        FirebaseAdminCoreModule.forRootAsync({
          useFactory: (config: ConfigService) => config.get('firebase'),
          inject: [ConfigService],
        }),
      ],
})
export class FirebaseModule {}

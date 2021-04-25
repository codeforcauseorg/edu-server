import { Module } from '@nestjs/common';
import { ConfigModule } from 'nestjs-config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FirebaseModule } from './modules/firebase/firebase.module';
import { UserModule } from './modules/user/user.module';
import { AssignmentModule } from './modules/assignment/assignment.module';
import { ChatModule } from './modules/chat/chat.module';
import * as path from 'path';
import { CourseModule } from './modules/course/course.module';
import { DoubtModule } from './modules/doubt/doubt.module';

@Module({
  imports: [
    ConfigModule.load(
      path.resolve(__dirname, 'config', '**', '!(*.d).{ts,js}'),
    ),
    FirebaseModule,
    AuthModule,
    AssignmentModule,
    MongooseModule.forRoot('mongodb://localhost/nest'),
    UserModule,
    CourseModule,
    ChatModule,
    DoubtModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from 'nestjs-config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FirebaseModule } from './firebase/firebase.module';
import { UserModule } from './user/user.module';
import { AssignmentModule } from './assignment/assignment.module';
import { ChatModule } from './chat/chat.module';
import * as path from 'path';
import { CourseModule } from './modules/course/course.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

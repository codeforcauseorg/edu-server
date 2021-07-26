import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from 'nestjs-config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import { AssignmentModule } from './modules/assignment/assignment.module';
import { ChatModule } from './modules/chat/chat.module';
import * as path from 'path';
import { CourseModule } from './modules/course/course.module';
import { DoubtModule } from './modules/doubt/doubt.module';
import { AnnouncementModule } from './modules/announcements/announcement.module';
import { MentorModule } from './modules/mentor/mentor.module';

import * as dotenv from 'dotenv';
import { PreauthMiddleware } from './middleware/preAuth.middleware';
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

@Module({
  imports: [
    ConfigModule.load(
      path.resolve(__dirname, 'config', '**', '!(*.d).{ts,js}'),
    ),
    AssignmentModule,
    MongooseModule.forRoot(process.env.MONGOURL),
    UserModule,
    CourseModule,
    ChatModule,
    DoubtModule,
    AnnouncementModule,
    MentorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PreauthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}

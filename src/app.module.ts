import { Module } from '@nestjs/common';
import { ConfigModule } from 'nestjs-config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FirebaseModule } from './firebase/firebase.module';
import { UserModule } from './models/user/user.module';
import { AssignmentModule } from './models/assignment/assignment.module';
import { ChatModule } from './models/chat/chat.module';
import * as path from 'path';
import { CourseModule } from './models/course/course.module';
import { DoubtModule } from './models/doubt/doubt.module';
import { RoomModule } from './models/room/room.module';
import { ChatGateway } from './chat.gateway';
import { MessagesGateway } from './gateway/chat.gateway';
import { ChatSchema } from './schemas/chat.schema';
import { UserSchema } from './schemas/user.schema';
import { RoomSchema } from './schemas/room.schema';

@Module({
  imports: [
    ConfigModule.load(
      path.resolve(__dirname, 'config', '**', '!(*.d).{ts,js}'),
    ),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Chat', schema: ChatSchema },
      { name: 'Room', schema: RoomSchema },
    ]),
    FirebaseModule,
    AuthModule,
    AssignmentModule,
    MongooseModule.forRoot('mongodb://localhost/nest'),
    UserModule,
    CourseModule,
    ChatModule,
    DoubtModule,
    RoomModule,
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway, MessagesGateway],
})
export class AppModule {}

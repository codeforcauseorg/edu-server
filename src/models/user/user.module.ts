import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../../schemas/user.schema';
import { CourseSchema } from '../../schemas/course.schema';
import { ChatSchema } from '../../schemas/chat.schema';
import { RoomSchema } from 'src/schemas/room.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Course', schema: CourseSchema },
      { name: 'Room', schema: RoomSchema },
      { name: 'Chat', schema: ChatSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

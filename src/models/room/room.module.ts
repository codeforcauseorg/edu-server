import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../../schemas/user.schema';
import { CourseSchema } from '../../schemas/course.schema';
import { RoomsController } from './room.controller';
import { RoomService } from './room.service';
import { RoomSchema } from '../../schemas/room.schema';
import { ChatSchema } from '../../schemas/chat.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Course', schema: CourseSchema },
      { name: 'Room', schema: RoomSchema },
      { name: 'Chat', schema: ChatSchema },
    ]),
  ],
  controllers: [RoomsController],
  providers: [RoomService],
})
export class RoomModule {}

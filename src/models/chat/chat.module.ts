import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatSchema } from '../../schemas/chat.schema';
import { RoomSchema } from 'src/schemas/room.schema';
import { MessagesGateway } from './chat.gateway';
import { UserSchema } from '../../schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Chat', schema: ChatSchema },
      { name: 'Room', schema: RoomSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  controllers: [ChatController],
  providers: [ChatService, MessagesGateway],
})
export class ChatModule {}

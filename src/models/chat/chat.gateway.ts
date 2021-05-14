import {
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Model } from 'mongoose';
import { ChatDocument as Chat } from '../../schemas/chat.schema';
import { UserDocument as User } from '../../schemas/user.schema';
import { RoomDocument as Room } from '../../schemas/room.schema';
import { InjectModel } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';

@WebSocketGateway()
export class MessagesGateway implements OnGatewayDisconnect {
  constructor(
    @InjectModel('Chat') private readonly chatModel: Model<Chat>,
    @InjectModel('Room') private readonly roomsModel: Model<Room>,
    @InjectModel('User') private readonly usersModel: Model<User>,
  ) {}

  async handleDisconnect(client: Socket): Promise<any> {
    const user = await this.usersModel.findOne({ id: client.id });
    if (user) {
      /* client.server.emit('users-changed', {
        user: user.first_name,
        event: 'left',
      });*/
      user.id = null;
      await this.usersModel.findByIdAndUpdate(user._id, user);
    }
  }

  @SubscribeMessage('enter-chat-room')
  async enterChatRoom(
    client: Socket,
    data: { first_name: string; roomId: string },
  ) {
    let user = await this.usersModel.findOne({ first_name: data.first_name });
    if (!user) {
      /* user = await this.usersModel.create({
        first_name: data.first_name,
        id: client.id,
      });*/
      throw new NotFoundException('user not found');
    } else {
      user.id = client.id;
      user = await this.usersModel.findByIdAndUpdate(user._id, user, {
        new: true,
      });
    }
    /* client
      .join(data.roomId)
      .broadcast.to(data.roomId)
      .emit('users-changed', { user: user.first_name, event: 'joined' }); */
  }

  @SubscribeMessage('leave-chat-room')
  async leaveChatRoom(
    client: Socket,
    data: { first_name: string; roomId: string },
  ) {
    const user = await this.usersModel.findOne({ first_name: data.first_name });
    client.broadcast
      .to(data.roomId)
      .emit('users-changed', { user: user.first_name, event: 'left' });
    client.leave(data.roomId);
  }

  @SubscribeMessage('add-message')
  async addMessage(client: Socket, chat: Chat) {
    chat.owner = await this.usersModel.findOne({ id: client.id });
    chat = await this.chatModel.create(chat);
    // client.server.in(chat.room as string).emit('chat', chat);
  }
}

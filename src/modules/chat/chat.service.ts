import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Chat } from './interfaces/chat.interface';
import { CreateChatDTO } from './dto/create-chat.dto';

@Injectable()
export class ChatService {
  constructor(@InjectModel('Chat') private readonly ChatModel: Model<Chat>) {}

  // fetch all Chats
  async getAllChat(): Promise<Chat[]> {
    const Chats = await this.ChatModel.find().exec();
    return Chats;
  }

  // Get a single Chat
  async getChat(ChatId): Promise<Chat> {
    const Chat = await this.ChatModel.findById(ChatId).exec();

    if (Chat) {
      return Chat;
    }

    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: 'Chat Not Found',
      },
      HttpStatus.NOT_FOUND,
    );
  }

  // post a single Chat
  async addChat(CreateChatDTO: CreateChatDTO): Promise<Chat> {
    const newChat = await new this.ChatModel(CreateChatDTO);
    return newChat.save();
  }

  // Edit Chat details
  async updateChat(ChatID, CreateChatDTO: CreateChatDTO): Promise<Chat> {
    const updatedChat = await this.ChatModel.findByIdAndUpdate(
      ChatID,
      CreateChatDTO,
      { new: true },
    );
    return updatedChat;
  }

  // Delete a Chat
  async deleteChat(ChatID): Promise<any> {
    const deletedChat = await this.ChatModel.findByIdAndRemove(ChatID);
    return deletedChat;
  }
}

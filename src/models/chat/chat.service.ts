import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateChatDTO } from './dto/create-chat.dto';
import { ChatDocument as Chat } from '../../schemas/chat.schema';

@Injectable()
export class ChatService {
  constructor(@InjectModel('Chat') private readonly ChatModel: Model<Chat>) {}

  // fetch all Chats
  async getAllChat(): Promise<Chat[]> {
    const Chats = await this.ChatModel.find().exec();
    return Chats;
  }

  // Get a single Chat
  async getChat(ChatId: string): Promise<Chat> {
    try {
      const chat = await this.ChatModel.findById(ChatId).exec();
      if (chat) {
        return chat;
      }
    } catch (e) {
      throw new BadRequestException(e);
    }

    throw new NotFoundException('chat not found');
  }

  // post a single Chat
  async addChat(CreateChatDTO: CreateChatDTO): Promise<Chat> {
    try {
      return await new this.ChatModel(CreateChatDTO).save();
    } catch (e) {
      throw new Error(e);
    }
  }

  // Edit Chat details
  async updateChat(
    chatId: string,
    CreateChatDTO: CreateChatDTO,
  ): Promise<Chat> {
    try {
      const chat = await this.ChatModel.findByIdAndUpdate(
        chatId,
        CreateChatDTO,
        { new: true },
      );

      if (chat) {
        return chat;
      }
    } catch (e) {
      throw new InternalServerErrorException(e);
    }

    throw new NotFoundException('chat Not Found');
  }

  // Delete a Chat
  async deleteChat(ChatID): Promise<any> {
    const deletedChat = await this.ChatModel.findByIdAndRemove(ChatID);
    return deletedChat;
  }
}

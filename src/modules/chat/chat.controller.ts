import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  NotFoundException,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiProperty } from '@nestjs/swagger';
import { ChatService } from './chat.service'; //eslint-disable-line 
import { CreateChatDTO } from './dto/create-chat.dto'; //eslint-disable-line 

class ChatResponseBody {
  @ApiProperty({ required: true, example: '605e3fd9acc33583fb389aec' })
  id: string;

  @ApiProperty({ required: true, example: 'John' })
  sender: string;

  @ApiProperty({ required: true, example: 'Johny' })
  original_sender: string;

  @ApiProperty({ required: true, example: 'How are you!' })
  chats: string;
}

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  // add a Chat
  @Post()
  @UsePipes(ValidationPipe)
  async addChat(@Body() CreateChatDTO: CreateChatDTO) {
    const chat = await this.chatService.addChat(CreateChatDTO);
    return chat;
  }

  // Retrieve Chats list
  @ApiCreatedResponse({ type: [ChatResponseBody] })
  @Get()
  async getAllChat() {
    const chats = await this.chatService.getAllChat();
    return chats;
  }

  // Fetch a particular Chat using ID
  @ApiCreatedResponse({ type: ChatResponseBody })
  @Get('/:chatId')
  async getChat(@Param('chatId') chatId: string) {
    const chat = await this.chatService.getChat(chatId);
    return chat;
  }

  @Put('/:chatId')
  async updateChat(
    @Param('chatId') chatId: string,
    @Body() createChatDTO: CreateChatDTO,
  ) {
    console.log('chatId', chatId);
    const chat = await this.chatService.updateChat(chatId, createChatDTO);

    if (!chat) throw new NotFoundException('Chat does not exist!');

    return chat;
  }

  // Delete a Chat
  @Delete('/:chatId')
  async deleteChat(@Param('chatId') chatId: string) {
    const chat = await this.chatService.deleteChat(chatId);
    if (!chat) throw new NotFoundException('Chat does not exist');
    return chat;
  }
}

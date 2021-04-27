import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  NotFoundException,
  Delete,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ChatService } from './chat.service'; //eslint-disable-line 
import { CreateChatDTO } from './dto/create-chat.dto'; //eslint-disable-line 
import { ApiCreatedResponse, ApiProperty } from '@nestjs/swagger';

class ChatResponseBody {
  @ApiProperty({ required: true, example: '605e3fd9acc33583fb389aec' })
  id: string;

  @ApiProperty({ required: true, example: 'Noob' })
  sender: string;

  @ApiProperty({ required: true, example: 'Coder' })
  original_sender: string;

  @ApiProperty({ required: true, example: 'noobcoder@gmai.com' })
  chats: string;
}

@Controller('Chat')
export class ChatController {
  constructor(private ChatService: ChatService) {}

  // add a Chat
  @Post()
  @UsePipes(ValidationPipe)
  async addChat(@Body() CreateChatDTO: CreateChatDTO) {
    const chat = await this.ChatService.addChat(CreateChatDTO);
    return chat;
  }

  // Retrieve Chats list
  @ApiCreatedResponse({ type: [ChatResponseBody] })
  @Get()
  async getAllChat() {
    const chats = await this.ChatService.getAllChat();
    return chats;
  }

  // Fetch a particular Chat using ID
  @ApiCreatedResponse({ type: ChatResponseBody })
  @Get('/:chatId')
  async getChat(@Param('chatId') chatId: string) {
    const chat = await this.ChatService.getChat(chatId);
    return chat;
  }

  @Put('/:chatId')
  async updateChat(
    @Param('chatId') chatId: string,
    @Body() createChatDTO: CreateChatDTO,
  ) {
    console.log('chatId', chatId);
    const chat = await this.ChatService.updateChat(chatId, createChatDTO);

    if (!chat) throw new NotFoundException('Chat does not exist!');

    return chat;
  }

  // Delete a Chat
  @Delete('/:chatId')
  async deleteChat(@Param('chatId') chatId: string) {
    const chat = await this.ChatService.deleteChat(chatId);
    if (!chat) throw new NotFoundException('Chat does not exist');
    return chat;
  }
}

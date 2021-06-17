import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiProperty, ApiTags } from '@nestjs/swagger';
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
  message: string;
}

@ApiTags('Chat')
@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  // add a Chat
  @Post()
  async addChat(@Body() CreateChatDTO: CreateChatDTO) {
    return await this.chatService.addChat(CreateChatDTO);
  }

  // Retrieve Chats list
  @ApiCreatedResponse({ type: [ChatResponseBody] })
  @Get()
  async getAllChat() {
    return await this.chatService.getAllChat();
  }

  // Fetch a particular Chat using ID
  @ApiCreatedResponse({ type: ChatResponseBody })
  @Get('/:chatId')
  async getChat(@Param('chatId') chatId: string) {
    return await this.chatService.getChat(chatId);
  }

  @Put('/:chatId')
  async updateChat(
    @Param('chatId') chatId: string,
    @Body() createChatDTO: CreateChatDTO,
  ) {
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

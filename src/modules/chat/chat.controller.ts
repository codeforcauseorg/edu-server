import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
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
  async addChat(@Res() res, @Body() CreateChatDTO: CreateChatDTO) {
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

  @Put('/update')
  async updateChat(@Query('uid') uid, @Body() createChatDTO: CreateChatDTO) {
    return await this.chatService.updateChat(uid, createChatDTO);
  }

  // Delete a Chat
  @Delete('/delete')
  async deleteChat(@Query('uid') uid) {
    return await this.chatService.deleteChat(uid);
  }
}

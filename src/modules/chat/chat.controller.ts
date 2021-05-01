import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Post,
  Body,
  Put,
  Query,
  NotFoundException,
  Delete,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ChatService } from './chat.service'; //eslint-disable-line 
import { CreateChatDTO } from './dto/create-chat.dto'; //eslint-disable-line 
import { ApiCreatedResponse, ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsEmail, IsMobilePhone, Length } from 'class-validator';

class ChatResponseBody {
  @ApiProperty({ required: true, example: '605e3fd9acc33583fb389aec' })
  id: string;
  @ApiProperty({ required: true, example: 'noob' })
  sender: string;
  @ApiProperty({ required: true, example: 'noob2' })
  original_sender: string;
  @ApiProperty({ required: true, example: 'Heyy' })
  chats: string;
}

@ApiTags('Chat')
@Controller('Chat')
export class ChatController {
  constructor(private ChatService: ChatService) {}

  // add a Chat
  @Post()
  @UsePipes(ValidationPipe)
  async addChat(@Res() res, @Body() CreateChatDTO: CreateChatDTO) {
    const Chat = await this.ChatService.addChat(CreateChatDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Chat has been created successfully',
      Chat,
    });
  }

  // Retrieve Chats list
  @ApiCreatedResponse({ type: [ChatResponseBody] })
  @Get()
  async getAllChat(@Res() res) {
    const Chats = await this.ChatService.getAllChat();
    return res.status(HttpStatus.OK).json(Chats);
  }

  // Fetch a particular Chat using ID
  @ApiCreatedResponse({ type: ChatResponseBody })
  @Get('/:chatId')
  async getChat(@Res() res, @Param('chatId') chatId: string) {
    const Chat = await this.ChatService.getChat(chatId);
    return res.status(HttpStatus.OK).json(Chat);
  }

  @Put('/update')
  async updateChat(
    @Res() res,
    @Query('uid') uid,
    @Body() createChatDTO: CreateChatDTO,
  ) {
    const Chat = await this.ChatService.updateChat(uid, createChatDTO);

    if (!Chat) throw new NotFoundException('Chat does not exist!');

    return res.status(HttpStatus.OK).json({
      message: 'Chat has been successfully updated',
      Chat: Chat,
    });
  }

  // Delete a Chat
  @Delete('/delete')
  async deleteChat(@Res() res, @Query('uid') uid) {
    const Chat = await this.ChatService.deleteChat(uid);
    if (!Chat) throw new NotFoundException('Chat does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Chat has been deleted',
      Chat: Chat,
    });
  }
}

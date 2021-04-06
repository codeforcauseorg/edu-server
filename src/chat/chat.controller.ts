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
import { ApiCreatedResponse, ApiProperty } from '@nestjs/swagger';

class ChatResponseBody {
  @ApiProperty({ required: true, example: '605e3fd9acc33583fb389aec' })
  _id: string;

  @ApiProperty({ required: true, example: 'Noob' })
  first_name: string;

  @ApiProperty({ required: true, example: 'Coder' })
  last_name: string;

  @ApiProperty({ required: true, example: 'noobcoder@gmai.com' })
  email: string;

  @ApiProperty({ required: true, example: '+919999999999' })
  phone: string;

  @ApiProperty({ required: true, example: 'A-88, Mayur Vihar, Delhi' })
  address: string;

  @ApiProperty({ required: true, example: 'I am Noob Coder' })
  description: string;
}

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
  @Get('/:ChatId')
  async getChat(@Res() res, @Param('ChatId') ChatId: string) {
    const Chat = await this.ChatService.getChat(ChatId);
    return res.status(HttpStatus.OK).json(Chat);
  }

  @Put('/update')
  async updateChat(
    @Res() res,
    @Query('uid') uid,
    @Body() createChatDTO: CreateChatDTO,
  ) {
    console.log('ChatId', uid);
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

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
import { UserService } from './user.service'; //eslint-disable-line 
import { CreateUserDTO } from './dto/create-user.dto'; //eslint-disable-line 
import { ApiCreatedResponse, ApiProperty } from '@nestjs/swagger';

class UserResponseBody {
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

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // add a User
  @Post()
  @UsePipes(ValidationPipe)
  async addUser(@Res() res, @Body() CreateUserDTO: CreateUserDTO) {
    const User = await this.userService.addUser(CreateUserDTO);
    return res.status(HttpStatus.OK).json({
      message: 'User has been created successfully',
      User,
    });
  }

  // Retrieve Users list
  @ApiCreatedResponse({ type: [UserResponseBody] })
  @Get()
  async getAllUser(@Res() res) {
    const Users = await this.userService.getAllUser();
    return res.status(HttpStatus.OK).json(Users);
  }

  // Fetch a particular User using ID
  @ApiCreatedResponse({ type: UserResponseBody })
  @Get('/:userId')
  async getUser(@Param('userId') userId: string) {
    const user = await this.userService.findUserById(userId);
    return user;
  }

  @Put('/update')
  async updateUser(@Query('uid') uid, @Body() createUserDTO: CreateUserDTO) {
    const user = await this.userService.updateUser(uid, createUserDTO);

    if (!user) throw new NotFoundException('User does not exist!');

    return user;
  }

  // Delete a User
  @Delete('/delete')
  async deleteUser(@Query('uid') uid: string) {
    const user = await this.userService.deleteUser(uid);

    if (!user) throw new NotFoundException('User does not exist');

    return user;
  }
}

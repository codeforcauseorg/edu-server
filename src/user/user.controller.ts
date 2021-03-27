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
  constructor(private UserService: UserService) {}

  // add a User
  @Post('/create')
  async addUser(@Res() res, @Body() CreateUserDTO: CreateUserDTO) {
    const User = await this.UserService.addUser(CreateUserDTO);
    return res.status(HttpStatus.OK).json({
      message: 'User has been created successfully',
      User,
    });
  }

  // Retrieve Users list
  @ApiCreatedResponse({ type: [UserResponseBody] })
  @Get('users')
  async getAllUser(@Res() res) {
    const Users = await this.UserService.getAllUser();
    return res.status(HttpStatus.OK).json(Users);
  }

  // Fetch a particular User using ID
  @ApiCreatedResponse({ type: UserResponseBody })
  @Get('/:UserID')
  async getUser(@Res() res, @Param('UserID') UserID: string) {
    const User = await this.UserService.getUser(UserID);
    return res.status(HttpStatus.OK).json(User);
  }

  @Put('/update')
  async updateUser(
    @Res() res,
    @Query('UserID') UserID,
    @Body() CreateUserDTO: CreateUserDTO,
  ) {
    const User = await this.UserService.updateUser(UserID, CreateUserDTO);
    if (!User) throw new NotFoundException('User does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'User has been successfully updated',
      User,
    });
  }

  // Delete a User
  @Delete('/delete')
  async deleteUser(@Res() res, @Query('UserID') UserID) {
    const User = await this.UserService.deleteUser(UserID);
    if (!User) throw new NotFoundException('User does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'User has been deleted',
      User,
    });
  }
}

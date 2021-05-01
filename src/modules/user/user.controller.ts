import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsEmail, IsMobilePhone, Length } from 'class-validator';
import { CreateUserDTO } from './dto/create-user.dto'; //eslint-disable-line 
import { UpdateUserDTO } from './dto/update-user.dto'; //eslint-disable-line 
import { UserService } from './user.service'; //eslint-disable-line 

class UserResponseBody {
  @ApiProperty({ required: true, example: '605e3fd9acc33583fb389aec' })
  _id: string;

  @ApiProperty({ required: true, example: 'Noob' })
  @Length(3, 20)
  first_name: string;

  @ApiProperty({ required: true, example: 'Coder' })
  @Length(3, 20)
  last_name: string;

  @ApiProperty({ required: true, example: 'noobcoder@gmai.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ required: true, example: '+919999999999' })
  @IsMobilePhone('en-IN', { strictMode: true })
  phone: string;

  @ApiProperty({ required: true, example: 'A-88, Mayur Vihar, Delhi' })
  @Length(10, 40)
  address: string;

  @ApiProperty({ required: true, example: 'I am Noob Coder' })
  description: string;
}
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // add a User
  @Post()
  @UsePipes(ValidationPipe)
  async addUser(@Body() CreateUserDTO: CreateUserDTO) {
    return await this.userService.addUser(CreateUserDTO);
  }

  // Retrieve Users list
  @ApiCreatedResponse({ type: [UserResponseBody] })
  @Get()
  async getAllUser() {
    return await this.userService.getAllUser();
  }

  @Get('/enrolled')
  async getEnrolledCourses(@Query('id') id: string) {
    return await this.userService.getEnrolledCourses(id);
  }

  @Put('/enrolled')
  async addEnrolledCourses(
    @Query('uid') uid: string,
    @Query('cid') cid: string,
  ) {
    return await this.userService.addEnrolledCourse(uid, cid);
  }

  // Fetch a particular User using ID
  @ApiCreatedResponse({ type: UserResponseBody })
  @Get('get/:userId')
  async getUser(@Param('userId') userId: string) {
    return this.userService.findUserById(userId);
  }

  @Put('/update')
  @UsePipes(ValidationPipe)
  async updateUser(@Query('uid') uid, @Body() UpdateUserDTO: UpdateUserDTO) {
    const user = await this.userService.updateUser(uid, UpdateUserDTO);

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

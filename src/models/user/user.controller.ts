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
import { ApiCreatedResponse, ApiProperty } from '@nestjs/swagger';
import { CreateUserDTO } from './dto/create-user.dto'; //eslint-disable-line 
import { UpdateUserDTO } from './dto/update-user.dto'; //eslint-disable-line 
import { CourseType } from './course-status.enum';
import { UserService } from './user.service'; //eslint-disable-line 

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
  async addEnrolledCourses(@Query('id') studentId: string, @Body() cid: any) {
    return await this.userService.addCourse(
      studentId,
      cid.courseId,
      CourseType.ENROLLED,
    );
  }

  @Get('/wishlist')
  async getWishlist(@Query('id') id: string) {
    return await this.userService.getWishList(id);
  }

  @Put('/wishlist')
  async addWishlist(@Query('id') studentId: string, @Body() cid: any) {
    return await this.userService.addCourse(
      studentId,
      cid.courseId,
      CourseType.WISHLIST,
    );
  }

  // Fetch a particular User using ID
  @ApiCreatedResponse({ type: UserResponseBody })
  @Get('get/:userId')
  async getUser(@Param('userId') userId: string) {
    return await this.userService.findUserById(userId);
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

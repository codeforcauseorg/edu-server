import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
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

  @ApiProperty({ required: false, example: 80 })
  score: number;

  @ApiProperty({ required: true, example: true })
  isAdmin: boolean;

  @ApiProperty({ required: true, example: 1621487098241 })
  created_at: Date;

  @ApiProperty({ required: false, example: ['Python', 'Baka'] })
  enrolled_courses: string[];

  @ApiProperty({ required: false, example: ['DSA', 'Baka'] })
  wishlist: string[];
}

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // add a User
  @Post()
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
  async getEnrolledCourses(@Param('id') id: string) {
    return await this.userService.getEnrolledCourses(id);
  }

  @Put('/enrolled')
  async addEnrolledCourses(@Param('id') studentId: string, @Body() cid: any) {
    return await this.userService.addCourse(
      studentId,
      cid.courseId,
      CourseType.ENROLLED,
    );
  }

  @Get('get/:userId/wishlist')
  async getWishlist(@Param('userId') id: string) {
    return await this.userService.getWishList(id);
  }

  @Put('get/:userId/wishlist')
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

  @Put('/update/:userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() UpdateUserDTO: UpdateUserDTO,
  ) {
    return await this.userService.updateUser(userId, UpdateUserDTO);
  }

  // Delete a User
  @Delete('/delete/:userId')
  async deleteUser(@Param('userId') userId: string) {
    return await this.userService.deleteUser(userId);
  }
}

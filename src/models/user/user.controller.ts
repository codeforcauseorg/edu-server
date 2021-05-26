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
import { CreateEnrolledDto } from './dto/create-enrolled.dto';
import { CreateWishListDto } from './dto/create-wishlist.dto';
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

  @Get('/:userId/enrolledCourses')
  async getEnrolledCourses(@Param('userId') userId: string) {
    return await this.userService.getEnrolledCourses(userId);
  }

  @Post('/:userId/enrolledCourses')
  async addEnrolledCourses(
    @Param('userId') userId: string,
    // @Param('courseId') courseId: string,
    @Body() createEnroll: CreateEnrolledDto,
  ) {
    return await this.userService.addCourse(userId, createEnroll);
  }

  @Get('/:userId/wishlist')
  async getWishlist(@Param('userId') userId: string) {
    return await this.userService.getWishList(userId);
  }

  @Post('/:userId/wishlist')
  async addWishlist(
    @Param('userId') userId: string,
    @Body() createWishList: CreateWishListDto,
  ) {
    return await this.userService.addCourse(userId, createWishList);
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

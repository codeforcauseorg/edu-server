import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UserResponseBody } from './user.responseBody';
import { CreateUserDTO } from './dto/create-user.dto'; //eslint-disable-line 
import { UpdateUserDTO } from './dto/update-user.dto'; //eslint-disable-line 
import { UserService } from './user.service'; //eslint-disable-line 
import { CreateEnrolledDTO } from './dto/create-enrolled.dto';
import { UpdateEnrolledDTO } from './dto/update-enrolled.dto';
import { Schema } from 'mongoose';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // add a User
  @Post()
  @ApiCreatedResponse({ description: 'User created', type: UserResponseBody })
  async addUser(@Body() CreateUserDTO: CreateUserDTO) {
    return await this.userService.addUser(CreateUserDTO);
  }

  // Retrieve Users list
  @ApiOkResponse({ type: [UserResponseBody] })
  @Get()
  async getAllUser() {
    return await this.userService.getAllUser();
  }

  // retreiving all enrolled courses of a particular user
  @Get('/:userId/enrolledCourses')
  @ApiParam({ name: 'userId', type: String })
  @ApiOkResponse({ type: [Schema.Types.ObjectId] })
  async getEnrolledCourses(@Param('userId') userId: Schema.Types.ObjectId) {
    return await this.userService.getEnrolledCourses(userId);
  }

  // retreiving enrolled course by id of the course and of a user
  @Get('/:userId/enrolledCourses/:courseId')
  @ApiParam({ name: 'userId', type: String })
  @ApiOkResponse({ type: CreateEnrolledDTO })
  async getEnrolledCoursesById(
    @Param('userId') userId: Schema.Types.ObjectId,
    @Param('courseId') courseId: Schema.Types.ObjectId,
  ) {
    return await this.userService.getEnrolledCoursesById(userId, courseId);
  }

  // user enrolling courses
  @Post('/:userId/enrolledCourses')
  @ApiParam({ name: 'userId', type: String })
  @ApiCreatedResponse({ type: [Schema.Types.ObjectId] })
  async addEnrolledCourses(
    @Param('userId') userId: Schema.Types.ObjectId,
    @Body() createEnrolledDto: CreateEnrolledDTO,
  ) {
    return await this.userService.addCourse(userId, createEnrolledDto);
  }

  // user updating enrolled courses
  @Put('/:userId/enrolledCourses/:courseId')
  @ApiParam({ name: 'userId', type: String })
  @ApiCreatedResponse({ type: UpdateEnrolledDTO })
  async updateEnrolledCourses(
    @Param('userId') userId: Schema.Types.ObjectId,
    @Param('courseId') courseId: Schema.Types.ObjectId,
    @Body() updateEnrolledDto: UpdateEnrolledDTO,
  ) {
    return await this.userService.updateCourse(
      userId,
      updateEnrolledDto,
      courseId,
    );
  }

  // Get all wishlisted courses
  @Get('/:userId/wishlist')
  async getWishlist(
    @Param('userId') userId: Schema.Types.ObjectId,
  ): Promise<any[]> {
    return await this.userService.getWishList(userId);
  }

  // Add wishlist courses
  @Post('/:userId/wishlist')
  @ApiParam({ name: 'userId', type: String })
  @ApiCreatedResponse({ type: UserResponseBody })
  async addWishlist(
    @Param('userId') userId: Schema.Types.ObjectId,
    @Body() cId: Schema.Types.ObjectId,
  ) {
    return await this.userService.addWishlist(userId, cId);
  }

  // Fetch a particular User using ID
  @ApiOkResponse({ type: UserResponseBody })
  @ApiParam({ name: 'userId', type: String })
  @Get('get/:userId')
  async getUser(@Param('userId') userId: Schema.Types.ObjectId) {
    return await this.userService.findUserById(userId);
  }

  @Put('/update/:userId')
  @ApiParam({ name: 'userId', type: String })
  @ApiOkResponse({ type: UserResponseBody })
  async updateUser(
    @Param('userId') userId: Schema.Types.ObjectId,
    @Body() UpdateUserDTO: UpdateUserDTO,
  ) {
    return await this.userService.updateUser(userId, UpdateUserDTO);
  }

  // Delete a User
  @Delete('/delete/:userId')
  @ApiParam({ name: 'userId', type: String })
  @ApiOkResponse({ type: UserResponseBody })
  async deleteUser(@Param('userId') userId: Schema.Types.ObjectId) {
    return await this.userService.deleteUser(userId);
  }

  // Delete enrolled course
  @Delete('/:userId/enrolledCourses/:courseId')
  @ApiParam({ name: 'userId', type: String })
  @ApiOkResponse({ type: [Schema.Types.ObjectId] })
  async deleteEnrolled(
    @Param('userId') userId: Schema.Types.ObjectId,
    @Param('courseId') courseId: Schema.Types.ObjectId,
  ) {
    return await this.userService.deleteEnrolledCourse(userId, courseId);
  }

  // Delete a wishlist
  @Delete('/:userId/wishlist/:wishId')
  @ApiParam({ name: 'userId', type: String })
  @ApiOkResponse({ type: [Schema.Types.ObjectId] })
  async deleteWishList(
    @Param('userId') userId: Schema.Types.ObjectId,
    @Param('wishId') wishId: Schema.Types.ObjectId,
  ) {
    return await this.userService.deleteWishList(userId, wishId);
  }
}

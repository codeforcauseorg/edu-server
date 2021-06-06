import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import * as mongoose from 'mongoose';
import { UserResponseBody } from './user.responseBody';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { CreateUserDTO } from './dto/create-user.dto'; //eslint-disable-line 
import { UpdateUserDTO } from './dto/update-user.dto'; //eslint-disable-line 
import { UserService } from './user.service'; //eslint-disable-line 
import { CreateEnrolledDTO } from './dto/create-enrolled.dto';
import { UpdateEnrolledDTO } from './dto/update-enrolled.dto';

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
  @ApiCreatedResponse({ type: [UserResponseBody] })
  @Get()
  async getAllUser() {
    return await this.userService.getAllUser();
  }

  // retreiving all enrolled courses of a particular user
  @Get('/:userId/enrolledCourses')
  @ApiCreatedResponse({ type: [mongoose.Schema.Types.ObjectId] })
  async getEnrolledCourses(
    @Param('userId') userId: mongoose.Schema.Types.ObjectId,
  ) {
    return await this.userService.getEnrolledCourses(userId);
  }

  // retreiving enrolled course by id of the course and of a user
  @Get('/:userId/enrolledCourses/:courseId')
  @ApiCreatedResponse({ type: [mongoose.Schema.Types.ObjectId] })
  async getEnrolledCoursesById(
    @Param('userId') userId: mongoose.Schema.Types.ObjectId,
    @Param('courseId') courseId: mongoose.Schema.Types.ObjectId,
  ) {
    return await this.userService.getEnrolledCoursesById(userId, courseId);
  }

  // user enrolling courses
  @Post('/:userId/enrolledCourses')
  @ApiCreatedResponse({ type: [mongoose.Schema.Types.ObjectId] })
  async addEnrolledCourses(
    @Param('userId') userId: mongoose.Schema.Types.ObjectId,
    @Body() createEnrolledDto: CreateEnrolledDTO,
  ) {
    return await this.userService.addCourse(userId, createEnrolledDto);
  }

  // user updating enrolled courses
  @Put('/:userId/enrolledCourses/:courseId')
  @ApiCreatedResponse({ type: UpdateEnrolledDTO })
  async updateEnrolledCourses(
    @Param('userId') userId: mongoose.Schema.Types.ObjectId,
    @Param('courseId') courseId: mongoose.Schema.Types.ObjectId,
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
  @ApiCreatedResponse({ type: [mongoose.Schema.Types.ObjectId] })
  async getWishlist(@Param('userId') userId: mongoose.Schema.Types.ObjectId) {
    return await this.userService.getWishList(userId);
  }

  // Add wishlist courses
  @Post('/:userId/wishlist')
  @ApiCreatedResponse({ type: UserResponseBody })
  async addWishlist(
    @Param('userId') userId: mongoose.Schema.Types.ObjectId,
    @Body() cId: mongoose.Schema.Types.ObjectId,
  ) {
    return await this.userService.addWishlist(userId, cId);
  }

  // Fetch a particular User using ID
  @ApiCreatedResponse({ type: UserResponseBody })
  @Get('get/:userId')
  async getUser(@Param('userId') userId: mongoose.Schema.Types.ObjectId) {
    return await this.userService.findUserById(userId);
  }

  @Put('/update/:userId')
  @ApiCreatedResponse({ type: UserResponseBody })
  async updateUser(
    @Param('userId') userId: mongoose.Schema.Types.ObjectId,
    @Body() UpdateUserDTO: UpdateUserDTO,
  ) {
    return await this.userService.updateUser(userId, UpdateUserDTO);
  }

  // Delete a User
  @Delete('/delete/:userId')
  @ApiCreatedResponse({ type: UserResponseBody })
  async deleteUser(@Param('userId') userId: mongoose.Schema.Types.ObjectId) {
    return await this.userService.deleteUser(userId);
  }

  // Delete enrolled course
  @Delete('/:userId/enrollerdCoursse/:courseId')
  @ApiCreatedResponse({ type: [mongoose.Schema.Types.ObjectId] })
  async deleteEnrolled(
    @Param('userId') userId: mongoose.Schema.Types.ObjectId,
    @Param('courseId') courseId: mongoose.Schema.Types.ObjectId,
  ) {
    return await this.userService.deleteEnrolledCourse(userId, courseId);
  }

  // Delete a wishlist
  @Delete('/:userId/wishlist/:wishId')
  @ApiCreatedResponse({ type: [mongoose.Schema.Types.ObjectId] })
  async deleteWishList(
    @Param('userId') userId: mongoose.Schema.Types.ObjectId,
    @Param('wishId') wishId: mongoose.Schema.Types.ObjectId,
  ) {
    return await this.userService.deleteWishList(userId, wishId);
  }
}

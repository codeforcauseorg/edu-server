import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import UserResponseBody from './docUtils/user.responsedoc';
import { CreateUserDTO } from './dto/create-user.dto'; //eslint-disable-line 
import { UpdateUserDTO } from './dto/update-user.dto'; //eslint-disable-line 
import { UserService } from './user.service'; //eslint-disable-line 
import { CreateEnrolledDTO } from './dto/create-enrolled.dto';
import { UpdateEnrolledDTO } from './dto/update-enrolled.dto';
import { Schema } from 'mongoose';
import responsedoc from './docUtils/apidoc';
import { userId } from './docUtils/user.paramdocs';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a User' })
  @ApiCreatedResponse(responsedoc.addUser)
  async addUser(@Req() request, @Body() CreateUserDTO: CreateUserDTO) {
    return await this.userService.addUser(request, CreateUserDTO);
  }

  @Get()
  @ApiOperation({ summary: 'Retreive user list' })
  @ApiOkResponse(responsedoc.getAllUser)
  async getAllUser() {
    return await this.userService.getAllUser();
  }

  @Get('/enrolledCourses/:userId')
  @ApiParam(userId)
  @ApiOperation({
    summary: 'retreiving all enrolled courses of a particular user',
  })
  @ApiOkResponse(responsedoc.getEnrolledCourses)
  async getEnrolledCourses(@Param('userId') userId: Schema.Types.ObjectId) {
    return await this.userService.getEnrolledCourses(userId);
  }

  @Get('/enrolledCourses/:userId/:courseId')
  @ApiParam(userId)
  @ApiOperation({
    summary: 'retreiving enrolled course by id of the course and of a user',
  })
  @ApiOkResponse(responsedoc.getEnrolledCoursesById)
  async getEnrolledCoursesById(
    @Param('userId') userId: Schema.Types.ObjectId,
    @Param('courseId') courseId: Schema.Types.ObjectId,
  ) {
    return await this.userService.getEnrolledCoursesById(userId, courseId);
  }

  @Put('/enrolledCourses/:userId')
  @ApiParam(userId)
  @ApiOperation({ summary: 'user enrolling courses' })
  @ApiCreatedResponse(responsedoc.addEnrolledCourses)
  async addEnrolledCourses(
    @Param('userId') userId: Schema.Types.ObjectId,
    @Body() createEnrolledDto: CreateEnrolledDTO,
  ) {
    return await this.userService.addCourse(userId, createEnrolledDto);
  }

  @Put('/enrolledCourses/:userId/:courseId')
  @ApiParam(userId)
  @ApiOperation({ summary: 'user updating enrolled courses' })
  @ApiCreatedResponse(responsedoc.updateEnrolledCourses)
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

  @Get('/wishlist/:userId')
  @ApiOperation({ summary: 'Get all wishlisted courses' })
  @ApiOkResponse(responsedoc.getWishlist)
  async getWishlist(
    @Param('userId') userId: Schema.Types.ObjectId,
  ): Promise<any[]> {
    return await this.userService.getWishList(userId);
  }

  @Put('/wishlist/:userId')
  @ApiOperation({ summary: 'Add wishlisted courses' })
  @ApiParam(userId)
  @ApiCreatedResponse(responsedoc.addWishlist)
  async addWishlist(
    @Param('userId') userId: Schema.Types.ObjectId,
    @Body() cId: Schema.Types.ObjectId,
  ) {
    return await this.userService.addWishlist(userId, cId);
  }

  @Get('get/:userId')
  @ApiParam(userId)
  @ApiOperation({ summary: 'Fetch a particular User using ID' })
  @ApiOkResponse({ type: UserResponseBody })
  async getUser(@Param('userId') userId: Schema.Types.ObjectId) {
    return await this.userService.findUserById(userId);
  }

  @Put('/update/:userId')
  @ApiParam(userId)
  @ApiOperation({ summary: 'update a User by Id' })
  @ApiOkResponse({ type: UserResponseBody })
  async updateUser(
    @Param('userId') userId: Schema.Types.ObjectId,
    @Body() UpdateUserDTO: UpdateUserDTO,
  ) {
    return await this.userService.updateUser(userId, UpdateUserDTO);
  }

  @Delete('/delete/:userId')
  @ApiParam(userId)
  @ApiOperation({ summary: 'Delete a User' })
  @ApiOkResponse({ type: UserResponseBody })
  async deleteUser(@Param('userId') userId: Schema.Types.ObjectId) {
    return await this.userService.deleteUser(userId);
  }

  @Delete('/enrolledCourses/:userId/:courseId')
  @ApiParam(userId)
  @ApiOperation({ summary: 'Delete enrolled course' })
  @ApiOkResponse({ type: [Schema.Types.ObjectId] })
  async deleteEnrolled(
    @Param('userId') userId: Schema.Types.ObjectId,
    @Param('courseId') courseId: Schema.Types.ObjectId,
  ) {
    return await this.userService.deleteEnrolledCourse(userId, courseId);
  }

  @Delete('/wishlist/:userId/:wishId')
  @ApiParam(userId)
  @ApiOperation({ summary: 'Delete a wishlist' })
  @ApiOkResponse({ type: [Schema.Types.ObjectId] })
  async deleteWishList(
    @Param('userId') userId: Schema.Types.ObjectId,
    @Param('wishId') wishId: Schema.Types.ObjectId,
  ) {
    return await this.userService.deleteWishList(userId, wishId);
  }
}

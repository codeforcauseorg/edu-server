import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Query,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
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
import { RolesGuard } from '../../middleware/roles.guard';
import { Roles } from '../../middleware/role.decorator';
import { Role } from '../../roles/role.enum';

@ApiTags('User')
@Controller('user')
@UseGuards(RolesGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a User' })
  @ApiCreatedResponse(responsedoc.addUser)
  async addUser(@Req() request, @Body() CreateUserDTO: CreateUserDTO) {
    return await this.userService.addUser(request, CreateUserDTO);
  }

  @Get('/me')
  @ApiOperation({ summary: 'Get the Logged in user Details' })
  @ApiOkResponse({ type: UserResponseBody })
  async getMe() {
    return await this.userService.getMe();
  }

  @Get('/enrolledCourses')
  @ApiOperation({
    summary: 'retreiving all enrolled courses of a particular user',
  })
  @ApiOkResponse(responsedoc.getEnrolledCourses)
  async getEnrolledCourses() {
    return await this.userService.getEnrolledCourses();
  }

  @Get('/enrolledCourses/:courseId')
  @ApiOperation({
    summary: 'retreiving enrolled course by id of the course and of a user',
  })
  @ApiOkResponse(responsedoc.getEnrolledCoursesById)
  async getEnrolledCoursesById(
    @Param('courseId') courseId: Schema.Types.ObjectId,
  ) {
    return await this.userService.getEnrolledCoursesById(courseId);
  }

  @Put('/enrolledCourses')
  @ApiOperation({ summary: 'user enrolling courses' })
  @ApiCreatedResponse(responsedoc.addEnrolledCourses)
  async addEnrolledCourses(@Body() createEnrolledDto: CreateEnrolledDTO) {
    return await this.userService.addCourse(createEnrolledDto);
  }

  @Put('/enrolledCourses/:courseId')
  @ApiOperation({ summary: 'user updating enrolled courses' })
  @ApiCreatedResponse(responsedoc.updateEnrolledCourses)
  async updateEnrolledCourses(
    @Param('courseId') courseId: Schema.Types.ObjectId,
    @Body() updateEnrolledDto: UpdateEnrolledDTO,
  ) {
    return await this.userService.updateCourse(updateEnrolledDto, courseId);
  }

  @Get('/wishlist')
  @ApiOperation({ summary: 'Get all wishlisted courses' })
  @ApiOkResponse(responsedoc.getWishlist)
  async getWishlist(): Promise<any[]> {
    return await this.userService.getWishList();
  }

  @Put('/wishlist')
  @ApiOperation({ summary: 'Add wishlisted courses' })
  @ApiCreatedResponse(responsedoc.addWishlist)
  async addWishlist(@Body() cId: Schema.Types.ObjectId) {
    return await this.userService.addWishlist(cId);
  }

  @Get('/cartList')
  @ApiOperation({ summary: 'Get all cartList courses' })
  @ApiOkResponse(responsedoc.getCartList)
  async getCartList(): Promise<any[]> {
    return await this.userService.getCartList();
  }

  @Put('/cartList')
  @ApiOperation({ summary: 'Add courses to cartList' })
  @ApiCreatedResponse(responsedoc.addCartList)
  async addcartList(@Body() cId: Schema.Types.ObjectId) {
    return await this.userService.addCartList(cId);
  }

  @Get('/get')
  @ApiOperation({ summary: 'Fetch a particular User using Email ID' })
  @ApiOkResponse({ type: UserResponseBody })
  async getuserByEmail(@Query() email) {
    return await this.userService.findUserByEmail(email);
  }

  @Get('/users')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Retreive user list' })
  @ApiOkResponse(responsedoc.getAllUser)
  async getAllUser() {
    return await this.userService.getAllUser();
  }

  @Get('/gamification')
  @ApiOperation({ summary: 'Gamification data retreival endpoint' })
  @ApiOkResponse(responsedoc.getAllGamified)
  async getAllGamified(@Query('skipNum') skipNum: string) {
    return await this.userService.getAllGamified(skipNum);
  }

  @Put('/update')
  @ApiOperation({ summary: 'update a User ' })
  @ApiOkResponse({ type: UserResponseBody })
  async updateUser(@Body() UpdateUserDTO: UpdateUserDTO) {
    return await this.userService.updateUser(UpdateUserDTO);
  }

  @Delete('/delete')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete a User' })
  @ApiOkResponse({ type: UserResponseBody })
  async deleteUser(@Query() query) {
    return await this.userService.deleteUser(query);
  }

  @Delete('/enrolledCourses/:courseId')
  @ApiOperation({ summary: 'Delete enrolled course' })
  @ApiOkResponse({ type: [Schema.Types.ObjectId] })
  async deleteEnrolled(@Param('courseId') courseId: Schema.Types.ObjectId) {
    return await this.userService.deleteEnrolledCourse(courseId);
  }

  @Delete('/wishlist/:wishId')
  @ApiOperation({ summary: 'Delete a wishlist' })
  @ApiOkResponse({ type: [Schema.Types.ObjectId] })
  async deleteWishList(@Param('wishId') wishId: Schema.Types.ObjectId) {
    return await this.userService.deleteWishList(wishId);
  }

  @Delete('/cartList/:cartId')
  @ApiOperation({ summary: 'Delete a course from cartlist' })
  @ApiOkResponse({ type: [Schema.Types.ObjectId] })
  async deleteCartList(@Param('cartId') cartId: Schema.Types.ObjectId) {
    return await this.userService.deleteCardList(cartId);
  }
}

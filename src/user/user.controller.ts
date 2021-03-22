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
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('User')
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
  @Get('Users')
  async getAllUser(@Res() res) {
    const Users = await this.UserService.getAllUser();
    return res.status(HttpStatus.OK).json(Users);
  }

  // Fetch a particular User using ID
  @Get('User/:UserID')
  async getUser(@Res() res, @Param('UserID') UserID) {
    const User = await this.UserService.getUser(UserID);
    if (!User) throw new NotFoundException('User does not exist!');
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

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly UserModel: Model<User>) {}

  // fetch all Users
  async getAllUser(): Promise<User[]> {
    const users = await this.UserModel.find().exec();
    return users;
  }

  // Get a single User
  async getUser(userId): Promise<User> {
    const user = await this.UserModel.findById(userId).exec();

    if (user) {
      return user;
    }

    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: 'User Not Found',
      },
      HttpStatus.NOT_FOUND,
    );
  }

  // post a single User
  async addUser(CreateUserDTO: CreateUserDTO): Promise<User> {
    const newUser = await new this.UserModel(CreateUserDTO);
    return newUser.save();
  }

  // Edit User details
  async updateUser(
    UserID,
    CreateUserDTO: CreateUserDTO,
  ): Promise<User | undefined> {
    const updatedUser = await this.UserModel.findByIdAndUpdate(
      UserID,
      CreateUserDTO,
      { new: true },
    );
    return updatedUser;
  }

  // Delete a User
  async deleteUser(UserID): Promise<any> {
    const deletedUser = await this.UserModel.findByIdAndRemove(UserID);
    return deletedUser;
  }
}

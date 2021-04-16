import { Injectable, NotFoundException } from '@nestjs/common';
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
  async findUserById(userId): Promise<User> {
    let user;
    try {
      user = await this.UserModel.findById(userId).exec();
    } catch (e) {
      throw new NotFoundException('User Not Found!');
    }

    return user;
  }

  // post a single User
  async addUser(CreateUserDTO: CreateUserDTO): Promise<User> {
    const newUser = await new this.UserModel(CreateUserDTO);
    return newUser.save();
  }

  // Edit User details
  async updateUser(UserID, CreateUserDTO: CreateUserDTO): Promise<User> {
    let updatedUser;
    try {
      updatedUser = await this.UserModel.findByIdAndUpdate(
        UserID,
        CreateUserDTO,
        { new: true },
      );
    } finally {
      return updatedUser;
    }
  }

  // Delete a User
  async deleteUser(UserID): Promise<any> {
    let deletedUser;
    try {
      deletedUser = await this.UserModel.findByIdAndRemove(UserID);
    } finally {
      return deletedUser;
    }
  }
}

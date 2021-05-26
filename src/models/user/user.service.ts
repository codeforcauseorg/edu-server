import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument as User } from './schema/user.schema';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UpdateCourseDTO } from './dto/update-course.user.dto';
import { CreateEnrolledDto } from './dto/create-enrolled.dto';
import { CourseDocument as Course } from '../course/schema/course.schema';
import { CourseType } from './course-status.enum';
import { CreateWishListDto } from './dto/create-wishlist.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Course') private readonly courseModel: Model<Course>,
  ) {}

  // fetch all Users
  async getAllUser(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    return users;
  }

  // Get a single User
  async findUserById(userId): Promise<User> {
    try {
      const user = await this.userModel.findById(userId).exec();

      if (user) {
        return user;
      }
    } catch (e) {
      throw new NotFoundException('User Not Found!');
    }
    throw new NotFoundException('User Not Found!');
  }

  // post a single User
  async addUser(CreateUserDTO: CreateUserDTO): Promise<User> {
    const newUser = await new this.userModel(CreateUserDTO);
    return newUser.save();
  }

  // Edit User details
  async updateUser(
    userID: string,
    UpdateUserDTO: UpdateUserDTO,
  ): Promise<User> {
    let updatedUser;
    try {
      updatedUser = await this.userModel.findByIdAndUpdate(
        userID,
        UpdateUserDTO,
        { new: true, useFindAndModify: false },
      );
    } catch (e) {
      throw new BadRequestException(e);
    } finally {
      return updatedUser;
    }
  }

  // Delete a User
  async deleteUser(userID: string): Promise<any> {
    let deletedUser;
    try {
      deletedUser = await this.userModel.findByIdAndRemove(userID);
    } finally {
      return deletedUser;
    }
  }

  // course
  async getEnrolledCourses(userId: string) {
    const UserEnrolled = await this.findUserById(userId);
    return UserEnrolled.enrolled_courses;
  }

  async addCourse(userId: string, createEnroll: CreateEnrolledDto) {
    try {
      const UserEnrolled = await this.findUserById(userId);

      if (UserEnrolled) {
        UserEnrolled.enrolled_courses.push(createEnroll);
        await UserEnrolled.save();
        return UserEnrolled;
      }
    } catch (e) {
      throw new NotFoundException('User or Course does not exist');
    }

    throw new NotFoundException('could not be enrolled');
  }

  async getWishList(userId: string) {
    const UserWishList = await this.findUserById(userId);
    return UserWishList.wishlist;
  }

  async addWishlist(userId: string, createWishList: CreateWishListDto) {
    try {
      const UserWishList = await this.findUserById(userId);

      if (UserWishList) {
        UserWishList.wishlist.push(createWishList);
        await UserWishList.save();
        return UserWishList;
      }
    } catch (e) {
      throw new NotFoundException('User or Course does not exist');
    }

    throw new NotFoundException('course could not be wishlisted');
  }
}

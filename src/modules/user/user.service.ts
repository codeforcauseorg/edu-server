import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { Course } from '../course/interfaces/course.interface';

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
    let user: User;
    try {
      user = await this.userModel.findById(userId).exec();
    } catch (e) {
      throw new NotFoundException('User Not Found!');
    }

    return user;
  }

  // post a single User
  async addUser(CreateUserDTO: CreateUserDTO): Promise<User> {
    const newUser = await new this.userModel(CreateUserDTO);
    return newUser.save();
  }

  // Edit User details
  async updateUser(
    UserID: string,
    UpdateUserDTO: UpdateUserDTO,
  ): Promise<User> {
    let updatedUser;
    try {
      updatedUser = await this.userModel.findByIdAndUpdate(
        UserID,
        UpdateUserDTO,
        { new: true },
      );
    } catch (e) {
      throw new BadRequestException(e);
    } finally {
      return updatedUser;
    }
  }

  // Delete a User
  async deleteUser(UserID: string): Promise<any> {
    let deletedUser;
    try {
      deletedUser = await this.userModel.findByIdAndRemove(UserID);
    } finally {
      return deletedUser;
    }
  }

  // course
  async getEnrolledCourses(studentId: string) {
    const user = await this.findUserById(studentId);
    return user.enrolled_courses;
  }

  async addEnrolledCourse(studentId: string, cId: string) {
    let user: User;

    try {
      const enrolledCourse = await this.courseModel.findById(cId).exec(); // check is the courseId is valid
      user = await this.findUserById(studentId);
      const course = await this.getEnrolledCourses(studentId);
      course.push(cId);

      if (enrolledCourse) {
        const update: UpdateUserDTO = { ...user, enrolled_courses: course };
        await this.updateUser(studentId, update);
      } else {
        throw new NotFoundException('course not found');
      }
    } catch (e) {
      throw new BadRequestException(e);
    }

    return user;
  }
}

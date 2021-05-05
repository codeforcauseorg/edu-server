import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument as User } from '../../schemas/user.schema';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UpdateCourseDTO } from './dto/update-course.dto';
import { CourseDocument as Course } from '../../schemas/course.schema';
import { CourseType } from './course-status.enum';

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
    UserID: string,
    UpdateUserDTO: UpdateUserDTO,
  ): Promise<User> {
    let updatedUser;
    try {
      updatedUser = await this.userModel.findByIdAndUpdate(
        UserID,
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

  async addCourse(studentId: string, cId: string, courseType: CourseType) {
    try {
      const enrolledCourse = await this.courseModel.findById(cId).exec(); // check is the courseId is valid
      const user = await this.findUserById(studentId);
      const course = new Set(user.enrolled_courses);
      course.add(cId);

      if (enrolledCourse && user) {
        const update: UpdateCourseDTO = { [courseType]: [...course] };
        return await this.userModel.findByIdAndUpdate(studentId, update, {
          new: true,
          useFindAndModify: false,
        });
      }
    } catch (e) {
      throw new NotFoundException('course or user not found');
    }

    throw new NotFoundException('course or user not found');
  }

  async getWishList(studentId: string) {
    const user = await this.findUserById(studentId);
    return user.wishlist;
  }
}

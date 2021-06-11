import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model, Schema } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument as User } from './schema/user.schema';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { CourseDocument as Course } from '../course/schema/course.schema';
import { EnrolledCourseDocument as Enrolled } from '../course/schema/enrolledCourse.schema';
import { CreateEnrolledDTO } from './dto/create-enrolled.dto';
import { UpdateEnrolledDTO } from './dto/update-enrolled.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Course') private readonly courseModel: Model<Course>,
    @InjectModel('Enrolled') private readonly enrolledModel: Model<Enrolled>,
  ) {}

  // fetch all Users
  async getAllUser(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    return users;
  }

  // Get a single User
  async findUserById(userId: Schema.Types.ObjectId): Promise<User> {
    try {
      const user = await this.userModel.findById(userId).exec();

      if (user) {
        return user;
      }
    } catch (e) {
      throw new NotFoundException('User Not Found!');
    }
    throw new NotFoundException('Error');
  }

  // post a single User
  async addUser(CreateUserDTO: CreateUserDTO): Promise<User> {
    const newUser = await new this.userModel(CreateUserDTO);
    return newUser.save();
  }

  // Edit User details
  async updateUser(
    userID: Schema.Types.ObjectId,
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
  async deleteUser(userID: Schema.Types.ObjectId): Promise<any> {
    let deletedUser;
    try {
      deletedUser = await this.userModel.findByIdAndRemove(userID);
    } finally {
      return deletedUser;
    }
  }

  // gets all Enrolled courses
  async getEnrolledCoursesById(
    userId: Schema.Types.ObjectId,
    courseId: Schema.Types.ObjectId,
  ) {
    const enrolledCourses = await this.enrolledModel.findOne({
      studentId: userId,
      courseId: courseId,
    });
    return enrolledCourses;
  }

  // gets all Enrolled courses
  async getEnrolledCourses(userId: Schema.Types.ObjectId) {
    const enrolledCourses = await this.enrolledModel.findOne({
      studentId: userId,
    });
    return enrolledCourses;
  }

  // adds Enrolled Course
  async addCourse(
    _userId: Schema.Types.ObjectId,
    createEnrolledDTO: CreateEnrolledDTO,
  ) {
    try {
      const newEnrolled = await new this.enrolledModel(createEnrolledDTO);
      await newEnrolled.save();
      const course = await this.courseModel.findById(
        createEnrolledDTO.courseId,
      );

      if (course) {
        newEnrolled['videosWatched'] = new Array(course.video_num).fill(false);
        await newEnrolled.save();
        return newEnrolled;
      } else {
        throw new NotFoundException('course not found!');
      }

      // a test line to see the populated sets of data
      /*const newF = await this.enrolledModel.find({}).populate('students');
      return newF;*/
    } catch (e) {
      throw new NotFoundException('User or Course does not exist');
    }
  }

  // gets all wishlisted courses
  async getWishList(
    userId: Schema.Types.ObjectId,
  ): Promise<Schema.Types.ObjectId[]> {
    const userWishList = await this.findUserById(userId);
    return userWishList.wishlist;
  }

  // adds wishlisted course
  async addWishlist(userId: Schema.Types.ObjectId, cId: Schema.Types.ObjectId) {
    try {
      const UserWishList = await this.findUserById(userId);

      if (UserWishList) {
        UserWishList.wishlist.push(cId);
        await UserWishList.save();
        return UserWishList;
      }
    } catch (e) {
      throw new NotFoundException('User or Course does not exist');
    }

    throw new NotFoundException('course could not be wishlisted');
  }

  // Delete a wishList of User
  async deleteWishList(
    userID: Schema.Types.ObjectId,
    wishId: Schema.Types.ObjectId,
  ): Promise<any> {
    let deletedFrom;
    try {
      deletedFrom = await this.userModel.findById(userID);
      if (deletedFrom) {
        deletedFrom.wishlist = deletedFrom.wishlist.filter(
          (wishlist) => wishlist.id != wishId,
        );
        await deletedFrom.save();
        return deletedFrom;
      } else {
        throw new NotFoundException('not found');
      }
    } catch (e) {
      throw new NotFoundException('Failed to deleted');
    }
  }

  // update Enrolle Course
  async updateCourse(
    userID: Schema.Types.ObjectId,
    updateEnrolledDto: UpdateEnrolledDTO,
    courseId: Schema.Types.ObjectId,
  ): Promise<any> {
    try {
      const updatedCourse = await this.enrolledModel.findOneAndUpdate(
        {
          studentId: userID,
          courseId: courseId,
        },
        updateEnrolledDto,
        { new: true, useFindAndModify: false },
      );
      return updatedCourse;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  // Delete Enrolled Course of User
  async deleteEnrolledCourse(
    userID: Schema.Types.ObjectId,
    courseId: Schema.Types.ObjectId,
  ): Promise<any> {
    let deletedFrom;
    try {
      deletedFrom = await this.enrolledModel.findOneAndRemove({
        studentId: userID,
        courseId: courseId,
      });
      if (deletedFrom) {
        return deletedFrom;
      } else {
        throw new NotFoundException('not found');
      }
    } catch (e) {
      throw new NotFoundException('Failed to deleted');
    }
  }
}

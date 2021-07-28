import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ConflictException,
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
    try {
      const users = await this.userModel.find().exec();
      return users;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  // Get a single User
  async findUserById(userId: Schema.Types.ObjectId): Promise<User> {
    try {
      const user = await this.userModel.findById(userId).exec();

      if (user) {
        return user;
      }
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
    throw new NotFoundException('Error');
  }

  // post a single User
  async addUser(request, CreateUserDTO: CreateUserDTO): Promise<User> {
    try {
      const { email, fId } = request['user'];
      const userExists = await this.userModel.findOne({ email: email }).lean();
      if (userExists) {
        throw new ConflictException('User already exists');
      }
      const userToBeCreated = { ...CreateUserDTO, email, fId };
      const newUser = await new this.userModel(userToBeCreated);
      return newUser.save();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
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
      throw new InternalServerErrorException(e);
    } finally {
      return updatedUser;
    }
  }

  // Delete a User
  async deleteUser(userID: Schema.Types.ObjectId): Promise<any> {
    let deletedUser;
    try {
      deletedUser = await this.userModel.findByIdAndRemove(userID);
      return deletedUser;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  // gets all Enrolled courses
  async getEnrolledCoursesById(
    userId: Schema.Types.ObjectId,
    courseId: Schema.Types.ObjectId,
  ) {
    try {
      const enrolledCourses = await this.enrolledModel.findOne({
        studentId: userId,
        courseId: courseId,
      });
      return enrolledCourses;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  // gets all Enrolled courses
  async getEnrolledCourses(userId: Schema.Types.ObjectId) {
    try {
      const enrolledCourses = await this.enrolledModel.findOne({
        studentId: userId,
      });
      return enrolledCourses;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  // adds Enrolled Course
  async addCourse(
    _userId: Schema.Types.ObjectId,
    createEnrolledDTO: CreateEnrolledDTO,
  ) {
    try {
      const newEnrolled = await new this.enrolledModel(createEnrolledDTO);

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
      throw new InternalServerErrorException(e);
    }
  }

  // gets all wishlisted courses
  async getWishList(
    userId: Schema.Types.ObjectId,
  ): Promise<Schema.Types.ObjectId[]> {
    try {
      const userWishList = await this.findUserById(userId);
      return userWishList.wishlist;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  // adds wishlisted course
  async addWishlist(userId: Schema.Types.ObjectId, cId: Schema.Types.ObjectId) {
    try {
      const user = await this.findUserById(userId);

      if (user) {
        const doesWishlistExists = await this.courseModel.exists({
          _id: cId['cId'],
        });
        if (doesWishlistExists) {
          const doesUserExistInWishList = user.wishlist.includes(cId['cId']);
          if (!doesUserExistInWishList) {
            user.wishlist.push(cId['cId']);
            await user.save();
            return user;
          } else {
            throw new ConflictException('Course Already Exists In WishList');
          }
        } else {
          throw new NotFoundException("Wishlisted Course doesn't exist");
        }
      } else {
        throw new NotFoundException('User Not Found');
      }
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  // Delete a wishList of User
  async deleteWishList(
    userID: Schema.Types.ObjectId,
    wishId: Schema.Types.ObjectId,
  ): Promise<any> {
    try {
      const user = await this.userModel.findById(userID);
      if (user) {
        user.wishlist = user.wishlist.filter((wishlist) => wishlist != wishId);
        await user.save();
        return user;
      } else {
        throw new NotFoundException('not found');
      }
    } catch (e) {
      throw new InternalServerErrorException(e);
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
      throw new InternalServerErrorException(e);
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
      throw new InternalServerErrorException(e);
    }
  }
}

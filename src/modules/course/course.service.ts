import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CourseDocument as Course } from './schema/course.schema';
import { UpdateCourseDTO } from './dto/course-update.dto';
import { CreateCourseDto } from './dto/create-course.dto';
import { Schema } from 'mongoose';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { Schedule } from './schema/schedule.schema';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './schema/review.schema';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel('Course') private readonly CourseModel: Model<Course>,
    @InjectModel('Schedule') private readonly ScheduleModel: Model<Schedule>,
    @InjectModel('Review') private readonly ReviewModel: Model<Review>,
  ) {}

  // fetch all courses
  async getAllCourses(): Promise<Course[]> {
    try {
      return await this.CourseModel.find()
        .populate('schedule')
        .populate('reviews')
        .exec();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  // fetch selected course by id
  async findCourseById(courseId: Schema.Types.ObjectId): Promise<Course> {
    try {
      const Course = await this.CourseModel.findById(courseId)
        .populate('schedule')
        .populate('reviews')
        .exec();
      if (Course) {
        return Course;
      } else {
        throw new NotFoundException('course not found');
      }
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  // add course
  async addCourse(createCourseDto: CreateCourseDto): Promise<Course> {
    try {
      const newCourse = new this.CourseModel(createCourseDto);
      await newCourse.save();
      return newCourse;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  // edit course by Id
  async editCourse(
    courseId: Schema.Types.ObjectId,
    updateCourseDTO: UpdateCourseDTO,
  ): Promise<Course> {
    let updatedCourse = null;
    try {
      updatedCourse = await this.CourseModel.findByIdAndUpdate(
        courseId,
        updateCourseDTO,
        { new: true },
      );
    } catch (e) {
      throw new InternalServerErrorException(e);
    } finally {
      return updatedCourse;
    }
  }

  // Delete a Course by Id
  async deleteCourse(courseId): Promise<any> {
    try {
      const deletedCourse = await this.CourseModel.findByIdAndRemove(courseId);
      return deletedCourse;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  // Create a Schedule
  async addScheduleCourse(
    courseId: Schema.Types.ObjectId,
    createScheduleDto: CreateScheduleDto,
  ): Promise<any> {
    try {
      const course = await this.CourseModel.findById(courseId);
      if (course) {
        const newSchedule = new this.ScheduleModel(createScheduleDto);
        await newSchedule.save();
        course.schedule.push(newSchedule);
        await course.save();
        return newSchedule;
      } else {
        throw new NotFoundException(
          'The course id is invalid or the course no longer exists',
        );
      }
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  // update a Schedule by Id
  async updateScheduleCourse(
    courseId: Schema.Types.ObjectId,
    scheduleId: Schema.Types.ObjectId,
    updateScheduleDto: UpdateScheduleDto,
  ): Promise<any> {
    try {
      const course = await this.CourseModel.findById(courseId);
      if (course) {
        let updatedSchedule = null;
        updatedSchedule = await this.ScheduleModel.findByIdAndUpdate(
          scheduleId,
          updateScheduleDto,
          { new: true },
        );
        return updatedSchedule;
      } else {
        throw new NotFoundException(
          'The course id is invalid or the course no longer exists',
        );
      }
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  // Delete a schedule by Id
  async deleteScheduleCourse(
    courseId: Schema.Types.ObjectId,
    scheduleId: Schema.Types.ObjectId,
  ): Promise<any> {
    try {
      const course = await this.CourseModel.findById(courseId);
      if (course) {
        let deletedSchedule = null;
        deletedSchedule = await this.ScheduleModel.findByIdAndRemove(
          scheduleId,
        );
        return deletedSchedule;
      } else {
        throw new NotFoundException(
          'The course id is invalid or the course no longer exists',
        );
      }
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  // Create a Review
  async addReview(
    courseId: Schema.Types.ObjectId,
    createReviewDto: CreateReviewDto,
  ): Promise<any> {
    try {
      const course = await this.CourseModel.findById(courseId);
      if (course) {
        const newReview = new this.ReviewModel(createReviewDto);
        await newReview.save();
        course.reviews.push(newReview);
        await course.save();
        return newReview;
      } else {
        throw new NotFoundException(
          'The course id is invalid or the course no longer exists',
        );
      }
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  // update a Review by Id
  async updateReview(
    courseId: Schema.Types.ObjectId,
    reviewId: Schema.Types.ObjectId,
    updateReviewDto: UpdateReviewDto,
  ): Promise<any> {
    try {
      const course = await this.CourseModel.findById(courseId);
      if (course) {
        return await this.ReviewModel.findByIdAndUpdate(
          reviewId,
          updateReviewDto,
          { new: true },
        );
      } else {
        throw new NotFoundException(
          'The course id is invalid or the course no longer exists',
        );
      }
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  // Delete a Review by Id
  async deleteReview(
    courseId: Schema.Types.ObjectId,
    reviewId: Schema.Types.ObjectId,
  ): Promise<any> {
    try {
      const course = await this.CourseModel.findById(courseId);
      if (course) {
        return await this.ReviewModel.findByIdAndRemove(reviewId);
      } else {
        throw new NotFoundException(
          'The course id is invalid or the course no longer exists',
        );
      }
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}

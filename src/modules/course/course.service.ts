import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CourseDocument as Course } from './schema/course.schema';
import { UpdateCourseDTO } from './dto/course-update.dto';
import { CreateCourseDto } from './dto/create-course.dto';
import { Schema } from 'mongoose';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { Schedule } from './schema/schedule.schema';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel('Course') private readonly CourseModel: Model<Course>,
    @InjectModel('Schedule') private readonly ScheduleModel: Model<Schedule>,
  ) {}

  // fetch all courses
  async getAllCourses(): Promise<Course[]> {
    return await this.CourseModel.find().exec();
  }

  // fetch selected course by id
  async findCourseById(courseId: Schema.Types.ObjectId): Promise<Course> {
    try {
      const Course = await this.CourseModel.findById(courseId)
        .populate('schedule')
        .exec();
      if (Course) {
        return Course;
      } else {
        throw new NotFoundException('course not found');
      }
    } catch {
      throw new NotFoundException('course not found');
    }
  }

  // add course
  async addCourse(createCourseDto: CreateCourseDto): Promise<Course> {
    const newCourse = new this.CourseModel(createCourseDto);
    return await newCourse.save();
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
    } finally {
      return updatedCourse;
    }
  }

  // Delete a Course by Id
  async deleteCourse(courseId): Promise<any> {
    const deletedCourse = await this.CourseModel.findByIdAndRemove(courseId);
    return deletedCourse;
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
    } catch {
      throw new Error('failed to add schedule');
    }
  }
  // update a Schedule by Id

  // Delete a schedule by Id
}

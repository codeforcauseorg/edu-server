import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CourseDocument as Course } from './schema/course.schema';
import { UpdateCourseDTO } from './dto/course-update.dto';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel('Course') private readonly CourseModel: Model<Course>,
  ) {}

  // fetch all courses
  async getAllCourses(): Promise<Course[]> {
    return await this.CourseModel.find().exec();
  }

  // fetch selected course
  async findCourseById(CourseID: string): Promise<Course> {
    try {
      const Course = this.CourseModel.findById(CourseID).exec();
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
  async addCourse(courseDTO: CreateCourseDto): Promise<Course> {
    const newCourse = new this.CourseModel(courseDTO);
    return await newCourse.save();
  }

  // edit course
  async editCourse(
    CourseId: string,
    courseDTO: UpdateCourseDTO,
  ): Promise<Course> {
    let updatedCourse = null;
    try {
      updatedCourse = await this.CourseModel.findByIdAndUpdate(
        CourseId,
        courseDTO,
        { new: true },
      );
    } finally {
      return updatedCourse;
    }
  }
}

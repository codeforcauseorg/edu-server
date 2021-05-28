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
  async findCourseById(courseId: string): Promise<Course> {
    try {
      const Course = await this.CourseModel.findById(courseId).exec();
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

  // edit course
  async editCourse(
    courseId: string,
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

  // Delete a Course
  async deleteCourse(courseId): Promise<any> {
    const deletedCourse = await this.CourseModel.findByIdAndRemove(courseId);
    return deletedCourse;
  }
}

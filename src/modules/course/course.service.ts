import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from './course.interface';
import { CourseDTO } from './create-course.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel('Course') private readonly CourseModel: Model<Course>,
  ) {}

  // fetch all courses
  async getAllCourses(): Promise<Course[]> {
    const Courses = await this.CourseModel.find().exec();
    return Courses;
  }

  // fetch selected course
  async getSelectedCourse(CourseID: string): Promise<Course> {
    const Course = await this.CourseModel.findById(CourseID).exec();
    return Course;
  }

  // add course
  async addCourse(courseDTO: CourseDTO): Promise<Course> {
    const newCourse = new this.CourseModel(courseDTO);
    return newCourse.save();
  }

  // edit course
  async editCourse(CourseId: string, courseDTO: CourseDTO): Promise<Course> {
    const updatedCourse = await this.CourseModel.findByIdAndUpdate(
      CourseId,
      courseDTO,
      { new: true },
    );
    return updatedCourse;
  }
}

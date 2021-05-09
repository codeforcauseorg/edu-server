import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CourseService } from './course.service';
import { CourseDTO } from './dto/create-course.dto';

@Controller('course')
export class CourseController {
  constructor(private courseService: CourseService) {}

  // get all courses
  @Get('/all')
  async getAllCourses(@Res() res: Response) {
    const courses = await this.courseService.getAllCourses();
    return res.status(HttpStatus.OK).json(courses);
  }

  // get selected course
  @Get('/:courseID')
  async getSelectedCourse(@Res() res: Response, @Param('courseID') courseID) {
    const course = await this.courseService.findCourseById(courseID);
    if (!course) {
      throw new NotFoundException('Selected course not found');
    }
    return res.status(HttpStatus.OK).json(course);
  }

  // add a Course
  @Post('/create')
  async addCourse(@Body() courseDTO: CourseDTO) {
    const course = await this.courseService.addCourse(courseDTO);
    return course;
  }

  // update a course
  @Put('/edit')
  async editCourse(@Query('id') cId: string, @Body() courseDTO: CourseDTO) {
    const course = await this.courseService.editCourse(cId, courseDTO);

    if (!course) {
      throw new NotFoundException('Course Not Found');
    }

    return course;
  }
}

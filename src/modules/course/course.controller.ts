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
import { CourseService } from './course.service';
import { CourseDTO } from './create-course.dto';

@Controller('course')
export class CourseController {
  constructor(private courseService: CourseService) {}

  // get all courses
  @Get('/courses')
  async getAllCourses(@Res() res) {
    const courses = this.courseService.getAllCourses();
    return res.status(HttpStatus.OK).json(courses);
  }

  // get selected course
  @Get('/course/:CourseID')
  async getSelectedCourse(@Res() res, @Param('CourseID') CourseID) {
    const course = await this.courseService.getSelectedCourse(CourseID);
    if (!course) {
      throw new NotFoundException('Selected course not found');
    }
    return res.status(HttpStatus.OK).json(course);
  }

  // add a Course
  @Post('/create')
  async addCourse(@Res() res, @Body() courseDTO: CourseDTO) {
    const course = await this.courseService.addCourse(courseDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Course has been added successfully',
      course,
    });
  }

  // update a course
  @Put('/edit')
  async editCourse(
    @Res() res,
    @Query('CourseID') CourseID,
    @Body() courseDTO: CourseDTO,
  ) {
    const Course = await this.courseService.editCourse(CourseID, courseDTO);
    if (!Course) {
      throw new NotFoundException('Course does not exist');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Course has been successfully edited',
      Course,
    });
  }
}

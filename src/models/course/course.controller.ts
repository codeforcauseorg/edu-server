import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { UpdateCourseDTO } from './dto/course-update.dto';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';

@Controller('course')
export class CourseController {
  constructor(private courseService: CourseService) {}

  // get all courses
  @Get('/all')
  async getAllCourses() {
    return await this.courseService.getAllCourses();
  }

  // get selected course
  @Get('/:courseID')
  async getSelectedCourse(@Param('courseID') courseID: string) {
    return await this.courseService.findCourseById(courseID);
  }

  // add a Course
  @Post('/create')
  async addCourse(@Body() courseDTO: CreateCourseDto) {
    return await this.courseService.addCourse(courseDTO);
  }

  // update a course
  @Put('/edit/:courseID')
  async updateCourse(
    @Param('courseID') courseID: string,
    @Body() courseDTO: UpdateCourseDTO,
  ) {
    return await this.courseService.editCourse(courseID, courseDTO);
  }

  @Delete('delete/:courseID')
  async deleteCourse(@Param('courseID') courseID: string) {
    return await this.courseService.deleteCourse(courseID);
  }
}

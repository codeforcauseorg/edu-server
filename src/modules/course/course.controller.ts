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
  @Get('/:courseId')
  async getSelectedCourse(@Param('courseId') courseId: string) {
    return await this.courseService.findCourseById(courseId);
  }

  // add a Course
  @Post('/create')
  async addCourse(@Body() createCourseDto: CreateCourseDto) {
    return await this.courseService.addCourse(createCourseDto);
  }

  // update a course
  @Put('/edit/:courseId')
  async updateCourse(
    @Param('courseId') courseId: string,
    @Body() updateCourseDTO: UpdateCourseDTO,
  ) {
    return await this.courseService.editCourse(courseId, updateCourseDTO);
  }

  @Delete('delete/:courseId')
  async deleteCourse(@Param('courseId') courseId: string) {
    return await this.courseService.deleteCourse(courseId);
  }
}

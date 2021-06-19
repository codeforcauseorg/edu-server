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
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Schema } from 'mongoose';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { courseId } from './docUtils/course.paramdocs';
import responsedoc from './docUtils/apidoc';

@ApiTags('Course')
@Controller('course')
export class CourseController {
  constructor(private courseService: CourseService) {}

  // get all courses
  @Get('/all')
  @ApiOkResponse(responsedoc.getAllCourses)
  async getAllCourses() {
    return await this.courseService.getAllCourses();
  }

  // get selected course by Id
  @Get('/:courseId')
  @ApiOkResponse(responsedoc.getSelectedCourses)
  async getSelectedCourse(@Param('courseId') courseId: Schema.Types.ObjectId) {
    return await this.courseService.findCourseById(courseId);
  }

  // add a Course
  @Post('/create')
  @ApiCreatedResponse(responsedoc.addCourse)
  async addCourse(@Body() createCourseDto: CreateCourseDto) {
    return await this.courseService.addCourse(createCourseDto);
  }

  // update a course by Id
  @Put('/edit/:courseId')
  @ApiParam(courseId)
  @ApiOkResponse(responsedoc.updateCourse)
  async updateCourse(
    @Param('courseId') courseId: Schema.Types.ObjectId,
    @Body() updateCourseDTO: UpdateCourseDTO,
  ) {
    return await this.courseService.editCourse(courseId, updateCourseDTO);
  }

  // delete a course by Id
  @Delete('delete/:courseId')
  @ApiParam(courseId)
  @ApiOkResponse(responsedoc.deleteCourse)
  async deleteCourse(@Param('courseId') courseId: Schema.Types.ObjectId) {
    return await this.courseService.deleteCourse(courseId);
  }

  // Create a Schedule
  @Post('/schedule/:courseId')
  @ApiCreatedResponse(responsedoc.addScheduleCourse)
  @ApiParam(courseId)
  async addScheduleCourse(
    @Param('courseId') courseId: Schema.Types.ObjectId,
    @Body() createScheduleDto: CreateScheduleDto,
  ) {
    return await this.courseService.addScheduleCourse(
      courseId,
      createScheduleDto,
    );
  }

  // update a Schedule by Id
  @Put('/schedule/:courseId/:scheduleId')
  @ApiParam(courseId)
  @ApiOkResponse(responsedoc.updateScheduleCourse)
  async updateScheduleCourse(
    @Param('courseId') courseId: Schema.Types.ObjectId,
    @Param('scheduleId') scheduleId: Schema.Types.ObjectId,
    @Body() updateScheduleDto: UpdateScheduleDto,
  ) {
    return await this.courseService.updateScheduleCourse(
      courseId,
      scheduleId,
      updateScheduleDto,
    );
  }

  // Delete a schedule by Id
  @Delete('/schedule/:courseId/:scheduleId')
  @ApiParam(courseId)
  @ApiOkResponse(responsedoc.deleteScheduleCourse)
  async deleteScheduleCourse(
    @Param('courseId') courseId: Schema.Types.ObjectId,
    @Param('scheduleId') scheduleId: Schema.Types.ObjectId,
  ) {
    return await this.courseService.deleteScheduleCourse(courseId, scheduleId);
  }
}

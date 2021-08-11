import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UpdateCourseDTO } from './dto/course-update.dto';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Schema } from 'mongoose';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { courseId, scheduleId } from './docUtils/course.paramdocs';
import responsedoc from './docUtils/apidoc';
import { GetCourseFilterDto } from './dto/course-filter.dto';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';
import { RolesGuard } from '../../middleware/roles.guard';
import { Roles } from '../../middleware/role.decorator';
import { Role } from '../../roles/role.enum';

@ApiTags('Course')
@Controller('course')
@UseGuards(RolesGuard)
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Get('/cards/all')
  @ApiOperation({
    summary: 'get brief information on cards for all courses initially',
  })
  @ApiOkResponse(responsedoc.getAllCourses)
  async getBreifAllCourses() {
    return await this.courseService.getBreifAllCourses();
  }

  @Get('/all/query')
  @ApiOperation({ summary: 'fetch query results for search string' })
  @ApiOkResponse(responsedoc.getAllQueryCourses)
  async getSearchResults(@Query() filterDto: GetCourseFilterDto) {
    return await this.courseService.getSearchResults(filterDto);
  }

  @Get('/all')
  @ApiOperation({ summary: 'get all courses' })
  @ApiOkResponse(responsedoc.getAllCourses)
  async getAllCourses() {
    return await this.courseService.getAllCourses();
  }

  @Get('/:courseId')
  @ApiParam(courseId)
  @ApiOperation({ summary: 'get selected course by Id' })
  @ApiOkResponse(responsedoc.getSelectedCourses)
  async getSelectedCourse(@Param('courseId') courseId: Schema.Types.ObjectId) {
    return await this.courseService.findCourseById(courseId);
  }

  @Post('/create')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'add a Course' })
  @ApiCreatedResponse(responsedoc.addCourse)
  async addCourse(@Body() createCourseDto: CreateCourseDto) {
    return await this.courseService.addCourse(createCourseDto);
  }

  @Put('/edit/:courseId')
  @Roles(Role.ADMIN)
  @ApiParam(courseId)
  @ApiOperation({ summary: 'update a course by Id' })
  @ApiOkResponse(responsedoc.updateCourse)
  async updateCourse(
    @Param('courseId') courseId: Schema.Types.ObjectId,
    @Body() updateCourseDTO: UpdateCourseDTO,
  ) {
    return await this.courseService.editCourse(courseId, updateCourseDTO);
  }

  @Delete('delete/:courseId')
  @Roles(Role.ADMIN)
  @ApiParam(courseId)
  @ApiOperation({ summary: 'delete a course by Id' })
  @ApiOkResponse(responsedoc.deleteCourse)
  async deleteCourse(@Param('courseId') courseId: Schema.Types.ObjectId) {
    return await this.courseService.deleteCourse(courseId);
  }

  @Post('/schedule/:courseId')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Create a Schedule' })
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

  @Put('/schedule/:courseId/:scheduleId')
  @Roles(Role.ADMIN)
  @ApiParam(courseId)
  @ApiOperation({ summary: 'update a Schedule by Id' })
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

  @Delete('/schedule/:courseId/:scheduleId')
  @Roles(Role.ADMIN)
  @ApiParam(courseId)
  @ApiOperation({ summary: 'Delete a schedule by Id' })
  @ApiOkResponse(responsedoc.deleteScheduleCourse)
  async deleteScheduleCourse(
    @Param('courseId') courseId: Schema.Types.ObjectId,
    @Param('scheduleId') scheduleId: Schema.Types.ObjectId,
  ) {
    return await this.courseService.deleteScheduleCourse(courseId, scheduleId);
  }

  @Post('/review/:courseId')
  @ApiParam(courseId)
  @ApiOperation({ summary: 'Create a Review' })
  @ApiCreatedResponse(responsedoc.addReview)
  async addReview(
    @Param('courseId') courseId: Schema.Types.ObjectId,
    @Body() createReviewDto: CreateReviewDto,
  ) {
    return await this.courseService.addReview(courseId, createReviewDto);
  }

  @Put('/review/:courseId/:reviewId')
  @ApiParam(courseId)
  @ApiOperation({ summary: 'update a Review by Id' })
  @ApiOkResponse(responsedoc.updateReview)
  async updateReview(
    @Param('courseId') courseId: Schema.Types.ObjectId,
    @Param('reviewId') reviewId: Schema.Types.ObjectId,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return await this.courseService.updateReview(
      courseId,
      reviewId,
      updateReviewDto,
    );
  }

  @Delete('/review/:courseId/:reviewId')
  @ApiParam(courseId)
  @ApiOperation({ summary: 'Delete a Review by Id' })
  @ApiOkResponse(responsedoc.deleteReview)
  async deleteReview(
    @Param('courseId') courseId: Schema.Types.ObjectId,
    @Param('reviewId') reviewId: Schema.Types.ObjectId,
  ) {
    return await this.courseService.deleteReview(courseId, reviewId);
  }

  @Post('/newLecture/:scheduleId')
  @Roles(Role.ADMIN)
  @ApiParam(scheduleId)
  @ApiOperation({ summary: 'Create a Lecture' })
  @ApiCreatedResponse(responsedoc.addLecture)
  async addLecture(
    @Param('scheduleId') scheduleId: Schema.Types.ObjectId,
    @Body() createReviewDto: CreateLectureDto,
  ) {
    return await this.courseService.addLecture(scheduleId, createReviewDto);
  }

  @Put('/updateLecture/:scheduleId/:lectureId')
  @Roles(Role.ADMIN)
  @ApiParam(scheduleId)
  @ApiOperation({ summary: 'update a Lecture by Id' })
  @ApiOkResponse(responsedoc.updateLecture)
  async updateLecture(
    @Param('scheduleId') scheduleId: Schema.Types.ObjectId,
    @Param('lectureId') lectureId: Schema.Types.ObjectId,
    @Body() updateLectureDto: UpdateLectureDto,
  ) {
    return await this.courseService.updateLecture(
      scheduleId,
      lectureId,
      updateLectureDto,
    );
  }

  @Delete('/deleteLecture/:scheduleId/:lectureId')
  @Roles(Role.ADMIN)
  @ApiParam(scheduleId)
  @ApiOperation({ summary: 'Delete a Lecture by Id' })
  @ApiOkResponse(responsedoc.deleteLecture)
  async deleteLecture(
    @Param('scheduleId') scheduleId: Schema.Types.ObjectId,
    @Param('lectureId') lectureId: Schema.Types.ObjectId,
  ) {
    return await this.courseService.deleteLecture(scheduleId, lectureId);
  }

  @Post('/mentor/:courseId/:mentorId')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Add a mentor to course' })
  @ApiCreatedResponse(responsedoc.addMentorToCourse)
  @ApiParam(courseId)
  async addMentorToCourse(
    @Param('courseId') courseId: Schema.Types.ObjectId,
    @Param('mentorId') mentorId: Schema.Types.ObjectId,
  ) {
    return await this.courseService.addMentorToCourse(courseId, mentorId);
  }
}

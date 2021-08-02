import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CourseDocument as Course } from './schema/course.schema';
import { UpdateCourseDTO } from './dto/course-update.dto';
import { CreateCourseDto } from './dto/create-course.dto';
import { Schema } from 'mongoose';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { Schedule } from './schema/schedule.schema';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './schema/review.schema';
import { Assignment } from 'modules/assignment/schema/assignment.schema';
import { GetCourseFilterDto } from './dto/course-filter.dto';
import { Lecture } from './schema/lecture.schema';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel('Course') private readonly CourseModel: Model<Course>,
    @InjectModel('Schedule') private readonly ScheduleModel: Model<Schedule>,
    @InjectModel('Review') private readonly ReviewModel: Model<Review>,
    @InjectModel('Assignment')
    private readonly AssignmentModel: Model<Assignment>,
    @InjectModel('Lecture') private readonly LectureModel: Model<Lecture>,
  ) {}

  // fetch all courses without populating
  async findAllCourses(): Promise<Course[]> {
    try {
      return await this.CourseModel.find().exec();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  // fetch all courses
  async getAllCourses(): Promise<Course[]> {
    try {
      return await this.CourseModel.find()
        .populate('schedule')
        .populate('reviews')
        .populate('assignments')
        .exec();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  // fetch brief info for cards for all courses
  async getBreifAllCourses(): Promise<Course[]> {
    try {
      return await this.CourseModel.find()
        .select(
          'name courseShortDescription tags rating no_of_enrollments mentor crossPrice courseLevel courseThumbnail duration reviews video_num',
        )
        .populate('reviews')
        .lean();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  // fetch query results for search string
  async getSearchResults(filterDto: GetCourseFilterDto) {
    try {
      const { Query } = filterDto;
      if (!Query) {
        throw new NotFoundException('Enter something to search');
      }

      // attach the relevant search options, using regex
      const searchOptions = [];
      const regexQuery = new RegExp(Query, 'i');

      searchOptions.push({ name: { $regex: regexQuery } });

      // search using regex and lean for fast queries
      const data = await this.CourseModel.find({})
        .or(searchOptions)
        .limit(50)
        .lean();

      return data;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  // fetch selected course by id (schedule, reviews, assignments and lectures are populated)
  async findCourseById(courseId: Schema.Types.ObjectId): Promise<Course> {
    try {
      const Course = await this.CourseModel.findById(courseId)
        .populate('reviews')
        .populate('assignments')
        .populate({
          path: 'schedule',
          model: 'Schedule',
          populate: {
            path: 'lecture',
            model: 'Lecture',
          },
        })
        .exec();
      if (Course) {
        return Course;
      } else {
        throw new NotFoundException('course not found');
      }
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  // add course
  async addCourse(createCourseDto: CreateCourseDto): Promise<Course> {
    try {
      const newCourse = new this.CourseModel(createCourseDto);
      await newCourse.save();
      return newCourse;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
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
      ).exec();
    } catch (e) {
      throw new InternalServerErrorException(e);
    } finally {
      return updatedCourse;
    }
  }

  // Delete a Course by Id
  async deleteCourse(courseId): Promise<any> {
    try {
      const deletedCourse = await this.CourseModel.findByIdAndRemove(courseId);
      return deletedCourse;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
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
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  // update a Schedule by Id
  async updateScheduleCourse(
    courseId: Schema.Types.ObjectId,
    scheduleId: Schema.Types.ObjectId,
    updateScheduleDto: UpdateScheduleDto,
  ): Promise<any> {
    try {
      const course = await this.CourseModel.findById(courseId);
      if (course) {
        let updatedSchedule = null;
        updatedSchedule = await this.ScheduleModel.findByIdAndUpdate(
          scheduleId,
          updateScheduleDto,
          { new: true },
        );
        return updatedSchedule;
      } else {
        throw new NotFoundException(
          'The course id is invalid or the course no longer exists',
        );
      }
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  // Delete a schedule by Id
  async deleteScheduleCourse(
    courseId: Schema.Types.ObjectId,
    scheduleId: Schema.Types.ObjectId,
  ): Promise<any> {
    try {
      const course = await this.CourseModel.findById(courseId);
      if (course) {
        let deletedSchedule = null;
        deletedSchedule = await this.ScheduleModel.findByIdAndRemove(
          scheduleId,
        );
        return deletedSchedule;
      } else {
        throw new NotFoundException(
          'The course id is invalid or the course no longer exists',
        );
      }
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  // Create a Review
  async addReview(
    courseId: Schema.Types.ObjectId,
    createReviewDto: CreateReviewDto,
  ): Promise<any> {
    try {
      const course = await this.CourseModel.findById(courseId).populate(
        'reviews',
      );
      if (course) {
        const reviewExist = course.reviews.some(
          (review) =>
            review.reviewerId.toString() === createReviewDto.reviewerId,
        );
        if (reviewExist) {
          throw new ConflictException('You have already reviewed the course!');
        } else {
          const newReview = new this.ReviewModel(createReviewDto);
          await newReview.save();
          course.reviews.push(newReview);
          await course.save();
          return newReview;
        }
      } else {
        throw new NotFoundException(
          'The course id is invalid or the course no longer exists',
        );
      }
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  // update a Review by Id
  async updateReview(
    courseId: Schema.Types.ObjectId,
    reviewId: Schema.Types.ObjectId,
    updateReviewDto: UpdateReviewDto,
  ): Promise<any> {
    try {
      const course = await this.CourseModel.findById(courseId);
      if (course) {
        return await this.ReviewModel.findByIdAndUpdate(
          reviewId,
          updateReviewDto,
          { new: true },
        );
      } else {
        throw new NotFoundException(
          'The course id is invalid or the course no longer exists',
        );
      }
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  // Delete a Review by Id
  async deleteReview(
    courseId: Schema.Types.ObjectId,
    reviewId: Schema.Types.ObjectId,
  ): Promise<any> {
    try {
      const course = await this.CourseModel.findById(courseId);
      if (course) {
        return await this.ReviewModel.findByIdAndRemove(reviewId);
      } else {
        throw new NotFoundException(
          'The course id is invalid or the course no longer exists',
        );
      }
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  // add a new Lecture
  async addLecture(
    scheduleId: Schema.Types.ObjectId,
    createLectureDto: CreateLectureDto,
  ) {
    try {
      const schedule = await this.ScheduleModel.findById(scheduleId);
      if (schedule) {
        const newLecture = await new this.LectureModel(createLectureDto).save();
        schedule.lecture.push(newLecture);
        await schedule.save();
        return newLecture;
      } else {
        throw new NotFoundException(
          'The schedule id is invalid or the schedule no longer exists',
        );
      }
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  // edit the Lecture by Id
  async updateLecture(
    scheduleId: Schema.Types.ObjectId,
    lectureId: Schema.Types.ObjectId,
    updateLectureDto: UpdateLectureDto,
  ) {
    try {
      const schedule = await this.ScheduleModel.findById(scheduleId);
      if (schedule) {
        let updatedSchedule = null;
        updatedSchedule = await this.LectureModel.findByIdAndUpdate(
          lectureId,
          updateLectureDto,
          { new: true },
        );
        if (updatedSchedule) {
          return updatedSchedule;
        } else {
          throw new NotFoundException(
            'The lectureId id is invalid or the lectureId no longer exists',
          );
        }
      } else {
        throw new NotFoundException(
          'The schedule id is invalid or the schedule no longer exists',
        );
      }
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  // Delete a Lecture by Id
  async deleteLecture(
    scheduleId: Schema.Types.ObjectId,
    lectureId: Schema.Types.ObjectId,
  ): Promise<any> {
    try {
      const schedule = await this.ScheduleModel.findById(scheduleId);
      if (schedule) {
        let deletedSchedule = null;
        deletedSchedule = await this.LectureModel.findByIdAndRemove(lectureId);
        if (deletedSchedule) {
          return deletedSchedule;
        } else {
          throw new NotFoundException(
            'The lectureId id is invalid or the lectureId no longer exists',
          );
        }
      } else {
        throw new NotFoundException(
          'The schedule id is invalid or the schedule no longer exists',
        );
      }
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseSchema } from './schema/course.schema';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { ScheduleSchema } from './schema/schedule.schema';
import { ReviewSchema } from './schema/review.schema';
import { AssignmentSchema } from 'modules/assignment/schema/assignment.schema';
import { LectureSchema } from './schema/lecture.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Course', schema: CourseSchema },
      { name: 'Schedule', schema: ScheduleSchema },
      { name: 'Review', schema: ReviewSchema },
      { name: 'Assignment', schema: AssignmentSchema },
      { name: 'Lecture', schema: LectureSchema },
    ]),
  ],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}

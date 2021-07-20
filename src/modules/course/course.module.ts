import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseSchema } from './schema/course.schema';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { ScheduleSchema } from './schema/schedule.schema';
import { ReviewSchema } from './schema/review.schema';
import { DoubtSchema } from '../doubt/schema/doubt.schema';
import { DoubtAnswerSchema } from '../doubt/schema/doubtAnswer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Course', schema: CourseSchema },
      { name: 'Schedule', schema: ScheduleSchema },
      { name: 'Review', schema: ReviewSchema },
      { name: 'Doubt', schema: DoubtSchema },
      { name: 'DoubtAnswer', schema: DoubtAnswerSchema },
    ]),
  ],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}

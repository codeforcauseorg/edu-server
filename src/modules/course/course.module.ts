import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseSchema } from './schema/course.schema';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { ScheduleSchema } from './schema/schedule.schema';
import { ReviewSchema } from './schema/review.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Course', schema: CourseSchema },
      { name: 'Schedule', schema: ScheduleSchema },
      { name: 'Review', schema: ReviewSchema },
    ]),
  ],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}

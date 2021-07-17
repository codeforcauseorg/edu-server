import { Module } from '@nestjs/common';
import { MentorController } from './mentor.controller';
import { MentorService } from './mentor.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MentorSchema } from './schema/mentor.schema';
import { CourseSchema } from '../course/schema/course.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Mentor', schema: MentorSchema },
      { name: 'Course', schema: CourseSchema },
    ]),
  ],
  controllers: [MentorController],
  providers: [MentorService],
})
export class MentorModule {}

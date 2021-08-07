import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DoubtSchema } from './schema/doubt.schema';
import { DoubtController } from './doubt.controller';
import { DoubtService } from './doubt.service';
import { CourseSchema } from '../course/schema/course.schema';
import { DoubtAnswerSchema } from './schema/doubtAnswer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Doubt', schema: DoubtSchema },
      { name: 'DoubtAnswer', schema: DoubtAnswerSchema },
      { name: 'Course', schema: CourseSchema },
    ]),
  ],
  controllers: [DoubtController],
  providers: [DoubtService],
})
export class DoubtModule {}

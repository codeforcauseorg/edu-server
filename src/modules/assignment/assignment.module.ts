import { Module } from '@nestjs/common';
import { AssignmentController } from './assignment.controller';
import { AssignmentService } from './assignment.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AssignmentSchema } from './schema/assignment.schema';
import { CourseSchema } from '../course/schema/course.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Assignment', schema: AssignmentSchema },
      { name: 'Course', schema: CourseSchema },
    ]),
  ],
  controllers: [AssignmentController],
  providers: [AssignmentService],
})
export class AssignmentModule {}

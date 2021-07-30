import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AssignmentDocument as Assignment } from './schema/assignment.schema';
import { CreateAssignmentDTO } from './dto/create-assignment.dto';
import { UpdateAssignmentDTO } from './dto/update-assignment.dto';
import { Course } from 'modules/course/schema/course.schema';
import { Schema } from 'mongoose';

@Injectable()
export class AssignmentService {
  constructor(
    @InjectModel('Assignment')
    private readonly AssignmentModel: Model<Assignment>,
    @InjectModel('Course')
    private readonly CourseModel: Model<Course>,
  ) {}

  // post a single Assignment
  async addAssignment(
    courseId: Schema.Types.ObjectId,
    createAssignmentDTO: CreateAssignmentDTO,
  ): Promise<Assignment> {
    try {
      const course = await this.CourseModel.findById(courseId);
      if (course) {
        const newAssignment = await new this.AssignmentModel(
          createAssignmentDTO,
        );
        await newAssignment.save();
        course.assignments.push(newAssignment);
        await course.save();
        return newAssignment;
      } else {
        throw new NotFoundException(
          'The course id is invalid or the course no longer exists',
        );
      }
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  // Edit Assignment details
  async updateAssignment(
    courseId: Schema.Types.ObjectId,
    assignmentID: Schema.Types.ObjectId,
    updateAssignmentDTO: UpdateAssignmentDTO,
  ): Promise<Assignment> {
    try {
      const course = await this.CourseModel.findById(courseId);
      if (course) {
        let updatedAssignment = null;
        updatedAssignment = await this.AssignmentModel.findByIdAndUpdate(
          assignmentID,
          updateAssignmentDTO,
          { new: true },
        );
        if (updatedAssignment) {
          return updatedAssignment;
        } else {
          throw new NotFoundException(
            'The assignment id is invalid or the assignment no longer exists',
          );
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

  // Delete a Assignment
  async deleteAssignment(
    courseId: Schema.Types.ObjectId,
    assignmentID: Schema.Types.ObjectId,
  ): Promise<any> {
    try {
      const course = await this.CourseModel.findById(courseId);
      if (course) {
        let deletedAssignment = null;
        deletedAssignment = await this.AssignmentModel.findByIdAndRemove(
          assignmentID,
        );
        if (deletedAssignment) {
          return deletedAssignment;
        } else {
          throw new NotFoundException(
            'The assignment id is invalid or the assignment no longer exists',
          );
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
}

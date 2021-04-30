import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Assignment } from './interfaces/assignment.interface';
import { CreateAssignmentDTO } from './dto/create-assignment.dto';
import { UpdateAssignmentDTO } from './dto/update-assignment.dto';

@Injectable()
export class AssignmentService {
  constructor(
    @InjectModel('Assignment')
    private readonly AssignmentModel: Model<Assignment>,
  ) {}

  // fetch all Assignments
  async getAllAssignment(): Promise<Assignment[]> {
    const Assignments = await this.AssignmentModel.find().exec();
    return Assignments;
  }

  // Get a single Assignment
  async getAssignment(AssignmentId): Promise<Assignment> {
    const Assignment = await this.AssignmentModel.findById(AssignmentId).exec();

    if (Assignment) {
      return Assignment;
    }

    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: 'Assignment Not Found',
      },
      HttpStatus.NOT_FOUND,
    );
  }

  // post a single Assignment
  async addAssignment(
    CreateAssignmentDTO: CreateAssignmentDTO,
  ): Promise<Assignment> {
    const newAssignment = await new this.AssignmentModel(CreateAssignmentDTO);
    return newAssignment.save();
  }

  // Edit Assignment details
  async updateAssignment(
    AssignmentID,
    updateAssignmentDTO: UpdateAssignmentDTO,
  ): Promise<Assignment> {
    const updatedAssignment = await this.AssignmentModel.findByIdAndUpdate(
      AssignmentID,
      updateAssignmentDTO,
      { new: true },
    );
    return updatedAssignment;
  }

  // Delete a Assignment
  async deleteAssignment(AssignmentID): Promise<any> {
    const deletedAssignment = await this.AssignmentModel.findByIdAndRemove(
      AssignmentID,
    );
    return deletedAssignment;
  }
}

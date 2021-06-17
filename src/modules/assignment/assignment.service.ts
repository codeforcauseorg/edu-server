import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AssignmentDocument as Assignment } from './schema/assignment.schema';
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
    try {
      const Assignments = await this.AssignmentModel.find().exec();
      return Assignments;
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `${e}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Get a single Assignment
  async getAssignment(AssignmentId): Promise<Assignment> {
    try {
      const Assignment = await this.AssignmentModel.findById(
        AssignmentId,
      ).exec();
      if (Assignment) {
        return Assignment;
      }
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `${e}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
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
    try {
      const newAssignment = await new this.AssignmentModel(CreateAssignmentDTO);
      return newAssignment.save();
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `${e}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Edit Assignment details
  async updateAssignment(
    AssignmentID,
    updateAssignmentDTO: UpdateAssignmentDTO,
  ): Promise<Assignment> {
    try {
      const updatedAssignment = await this.AssignmentModel.findByIdAndUpdate(
        AssignmentID,
        updateAssignmentDTO,
        { new: true },
      );
      return updatedAssignment;
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `${e}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Delete a Assignment
  async deleteAssignment(AssignmentID): Promise<any> {
    try {
      const deletedAssignment = await this.AssignmentModel.findByIdAndRemove(
        AssignmentID,
      );
      return deletedAssignment;
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `${e}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

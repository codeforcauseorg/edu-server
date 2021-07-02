import { Controller, Post, Body, Put, Delete, Param } from '@nestjs/common';
import { AssignmentService } from './assignment.service'; //eslint-disable-line 
import { CreateAssignmentDTO } from './dto/create-assignment.dto'; //eslint-disable-line 
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateAssignmentDTO } from './dto/update-assignment.dto';
import { Schema } from 'mongoose';
import { courseId } from './docUtils/assignment.paramdocs';
import responsedoc from './docUtils/apidoc';

@ApiTags('Assignment')
@Controller('assignment')
export class AssignmentController {
  constructor(private assignmentService: AssignmentService) {}

  // add an Assignment
  @Post('/:courseId')
  @ApiCreatedResponse(responsedoc.addAssignment)
  @ApiParam(courseId)
  async addAssignment(
    @Param('courseId') courseId: Schema.Types.ObjectId,
    @Body() CreateAssignmentDTO: CreateAssignmentDTO,
  ) {
    return await this.assignmentService.addAssignment(
      courseId,
      CreateAssignmentDTO,
    );
  }

  // Delete an Assignment
  @Put('/:courseId/:assignmentId')
  @ApiParam(courseId)
  @ApiOkResponse(responsedoc.updateAssignment)
  async updateAssignment(
    @Param('courseId') courseId: Schema.Types.ObjectId,
    @Param('assignmentId') assignmentId: Schema.Types.ObjectId,
    @Body() updateAssignmentDTO: UpdateAssignmentDTO,
  ) {
    return await this.assignmentService.updateAssignment(
      courseId,
      assignmentId,
      updateAssignmentDTO,
    );
  }

  // Delete an Assignment
  @Delete('/:courseId/:assignmentId')
  @ApiParam(courseId)
  @ApiOkResponse(responsedoc.deleteAssignment)
  async deleteAssignment(
    @Param('courseId') courseId: Schema.Types.ObjectId,
    @Param('assignmentId') assignmentId: Schema.Types.ObjectId,
  ) {
    return await this.assignmentService.deleteAssignment(
      courseId,
      assignmentId,
    );
  }
}

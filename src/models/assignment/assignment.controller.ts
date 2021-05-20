import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { AssignmentService } from './assignment.service'; //eslint-disable-line 
import { CreateAssignmentDTO } from './dto/create-assignment.dto'; //eslint-disable-line 
import { ApiCreatedResponse, ApiProperty } from '@nestjs/swagger';
import { UpdateAssignmentDTO } from './dto/update-assignment.dto';

class AssignmentResponseBody {
  @ApiProperty({ required: true, example: '605e3fd9acc33583fb389aec' })
  id: string;

  @ApiProperty({ required: true, example: 'Noob' })
  name: string;

  @ApiProperty({ required: true, example: 'Coder' })
  link: string;

  @ApiProperty({ required: true, example: 'noobcoder@gmai.com' })
  submit_by: string;
}

@Controller('assignment')
export class AssignmentController {
  constructor(private AssignmentService: AssignmentService) {}

  // add a Assignment
  @Post()
  async addAssignment(@Body() CreateAssignmentDTO: CreateAssignmentDTO) {
    return await this.AssignmentService.addAssignment(CreateAssignmentDTO);
  }

  // Retrieve Assignments list
  @ApiCreatedResponse({ type: [AssignmentResponseBody] })
  @Get()
  async getAllAssignment() {
    return await this.AssignmentService.getAllAssignment();
  }

  // Fetch a particular Assignment using ID
  @ApiCreatedResponse({ type: AssignmentResponseBody })
  @Get('/:assignmentId')
  async getAssignment(@Param('assignmentId') AssignmentId: string) {
    return await this.AssignmentService.getAssignment(AssignmentId);
  }

  @Put('/:assignmentId')
  async updateAssignment(
    @Param('assignmentId') assignmentId: string,
    @Body() updateAssignmentDTO: UpdateAssignmentDTO,
  ) {
    return await this.AssignmentService.updateAssignment(
      assignmentId,
      updateAssignmentDTO,
    );
  }

  // Delete a Assignment
  @Delete('/:assignmentId')
  async deleteAssignment(@Param('assignmentId') assignmentId: string) {
    return await this.AssignmentService.deleteAssignment(assignmentId);
  }
}

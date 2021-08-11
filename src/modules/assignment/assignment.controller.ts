import {
  Controller,
  Post,
  Body,
  Put,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AssignmentService } from './assignment.service'; //eslint-disable-line 
import { CreateAssignmentDTO } from './dto/create-assignment.dto'; //eslint-disable-line 
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateAssignmentDTO } from './dto/update-assignment.dto';
import { Schema } from 'mongoose';
import { courseId } from './docUtils/assignment.paramdocs';
import responsedoc from './docUtils/apidoc';
import { RolesGuard } from '../../middleware/roles.guard';
import { Roles } from '../../middleware/role.decorator';
import { Role } from '../../roles/role.enum';

@ApiTags('Assignment')
@Controller('assignment')
@UseGuards(RolesGuard)
export class AssignmentController {
  constructor(private assignmentService: AssignmentService) {}

  @Post('/:courseId')
  @Roles(Role.ADMIN)
  @ApiCreatedResponse(responsedoc.addAssignment)
  @ApiParam(courseId)
  @ApiOperation({ summary: 'add an Assignment' })
  async addAssignment(
    @Param('courseId') courseId: Schema.Types.ObjectId,
    @Body() CreateAssignmentDTO: CreateAssignmentDTO,
  ) {
    return await this.assignmentService.addAssignment(
      courseId,
      CreateAssignmentDTO,
    );
  }

  @Put('/:courseId/:assignmentId')
  @Roles(Role.ADMIN)
  @ApiParam(courseId)
  @ApiOperation({ summary: 'update an Assignment' })
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

  @Delete('/:courseId/:assignmentId')
  @Roles(Role.ADMIN)
  @ApiParam(courseId)
  @ApiOperation({ summary: 'delete an Assignment' })
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

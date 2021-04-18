import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Post,
  Body,
  Put,
  NotFoundException,
  Delete,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AssignmentService } from './assignment.service'; //eslint-disable-line 
import { CreateAssignmentDTO } from './dto/create-assignment.dto'; //eslint-disable-line 
import { ApiCreatedResponse, ApiProperty } from '@nestjs/swagger';

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

@Controller('Assignment')
export class AssignmentController {
  constructor(private AssignmentService: AssignmentService) {}

  // add a Assignment
  @Post()
  @UsePipes(ValidationPipe)
  async addAssignment(
    @Res() res,
    @Body() CreateAssignmentDTO: CreateAssignmentDTO,
  ) {
    const Assignment = await this.AssignmentService.addAssignment(
      CreateAssignmentDTO,
    );
    return res.status(HttpStatus.OK).json({
      message: 'Assignment has been created successfully',
      Assignment,
    });
  }

  // Retrieve Assignments list
  @ApiCreatedResponse({ type: [AssignmentResponseBody] })
  @Get()
  async getAllAssignment(@Res() res) {
    const Assignments = await this.AssignmentService.getAllAssignment();
    return res.status(HttpStatus.OK).json(Assignments);
  }

  // Fetch a particular Assignment using ID
  @ApiCreatedResponse({ type: AssignmentResponseBody })
  @Get('/:AssignmentId')
  async getAssignment(@Res() res, @Param('AssignmentId') AssignmentId: string) {
    const Assignment = await this.AssignmentService.getAssignment(AssignmentId);
    return res.status(HttpStatus.OK).json(Assignment);
  }

  @Put('/:AssignmentId')
  async updateAssignment(
    @Res() res,
    @Param('AssignmentId') AssignmentId: string,
    @Body() createAssignmentDTO: CreateAssignmentDTO,
  ) {
    console.log('AssignmentId', AssignmentId);
    const Assignment = await this.AssignmentService.updateAssignment(
      AssignmentId,
      createAssignmentDTO,
    );

    if (!Assignment) throw new NotFoundException('Assignment does not exist!');

    return res.status(HttpStatus.OK).json({
      message: 'Assignment has been successfully updated',
      Assignment: Assignment,
    });
  }

  // Delete a Assignment
  @Delete('/:AssignmentId')
  async deleteAssignment(
    @Res() res,
    @Param('AssignmentId') AssignmentId: string,
  ) {
    const Assignment = await this.AssignmentService.deleteAssignment(
      AssignmentId,
    );
    if (!Assignment) throw new NotFoundException('Assignment does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Assignment has been deleted',
      Assignment: Assignment,
    });
  }
}

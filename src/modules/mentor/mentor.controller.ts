import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateMentorDTO } from './dto/create-mentor.dto'; //eslint-disable-line 
import { UpdateMentorDTO } from './dto/update-mentor.dto'; //eslint-disable-line 
import { MentorService } from './mentor.service'; //eslint-disable-line 
import { Schema } from 'mongoose';
import responsedoc from './docUtils/apidoc';
import { mentorId } from './docUtils/mentor.paramdocs';

@ApiTags('Mentor')
@Controller('Mentor')
export class MentorController {
  constructor(private mentorService: MentorService) {}

  // add a Mentor
  @Post()
  @ApiOperation({
    summary: 'add a Mentor',
  })
  @ApiCreatedResponse(responsedoc.addMentor)
  async addMentor(@Body() CreateMentorDTO: CreateMentorDTO) {
    return await this.mentorService.addMentor(CreateMentorDTO);
  }

  // Retrieve Mentor list
  @Get()
  @ApiOperation({
    summary: 'Retrieve Mentor list',
  })
  @ApiOkResponse(responsedoc.getAllMentors)
  async getAllMentor() {
    return await this.mentorService.getAllMentor();
  }

  // Fetch a particular Mentor using ID
  @Get('get/:mentorId')
  @ApiParam(mentorId)
  @ApiOkResponse(responsedoc.getMentor)
  @ApiOperation({
    summary: 'Fetch a particular Mentor using ID',
  })
  async getMentor(@Param('mentorId') mentorId: Schema.Types.ObjectId) {
    return await this.mentorService.findMentorById(mentorId);
  }

  // update a mentor's info using id
  @Put('/update/:mentorId')
  @ApiParam(mentorId)
  @ApiOperation({
    summary: 'update info of a mentor using id',
  })
  @ApiOkResponse(responsedoc.updateMentor)
  async updateMentor(
    @Param('mentorId') mentorId: Schema.Types.ObjectId,
    @Body() UpdateMentorDTO: UpdateMentorDTO,
  ) {
    return await this.mentorService.updateMentor(mentorId, UpdateMentorDTO);
  }

  // Delete a Mentor
  @Delete('/delete/:mentorId')
  @ApiParam(mentorId)
  @ApiOperation({
    summary: 'Delete a Mentor',
  })
  @ApiOkResponse(responsedoc.deleteMentor)
  async deleteMentor(@Param('mentorId') mentorId: Schema.Types.ObjectId) {
    return await this.mentorService.deleteMentor(mentorId);
  }

  // assign course to mentor
  @Put('/assign/:mentorId')
  @ApiParam(mentorId)
  @ApiOperation({
    summary: 'assign course to mentor',
  })
  @ApiOkResponse(responsedoc.updateMentor)
  async assignCourseToMentor(
    @Param('mentorId') mentorId: Schema.Types.ObjectId,
    @Body() courseId: Schema.Types.ObjectId,
  ) {
    return await this.mentorService.assignCourseToMentor(mentorId, courseId);
  }
}

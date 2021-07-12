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
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import MentorResponseBody from './docUtils/mentor.responsedoc';
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
  @ApiCreatedResponse(responsedoc.addMentor)
  async addMentor(@Body() CreateMentorDTO: CreateMentorDTO) {
    return await this.mentorService.addMentor(CreateMentorDTO);
  }

  // Retrieve Mentor list
  @Get()
  @ApiOkResponse(responsedoc.getAllMentors)
  async getAllMentor() {
    return await this.mentorService.getAllMentor();
  }

  // Fetch a particular Mentor using ID
  @ApiParam(mentorId)
  @ApiOkResponse(responsedoc.getMentor)
  @Get('get/:mentorId')
  async getMentor(@Param('mentorId') mentorId: Schema.Types.ObjectId) {
    return await this.mentorService.findMentorById(mentorId);
  }

  // update a mentor's info using id
  @Put('/update/:mentorId')
  @ApiParam(mentorId)
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
  @ApiOkResponse(responsedoc.deleteMentor)
  async deleteMentor(@Param('mentorId') mentorId: Schema.Types.ObjectId) {
    return await this.mentorService.deleteMentor(mentorId);
  }

  // assign course to mentor
  @Put('/assign/:mentorId')
  @ApiParam(mentorId)
  @ApiOkResponse(responsedoc.updateMentor)
  async assignCourseToMentor(
    @Param('mentorId') mentorId: Schema.Types.ObjectId,
    @Body() courseId: Schema.Types.ObjectId,
  ) {
    return await this.mentorService.assignCourseToMentor(mentorId, courseId);
  }
}

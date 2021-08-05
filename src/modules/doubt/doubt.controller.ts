import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Schema } from 'mongoose';
import { DoubtService } from './doubt.service';
import { CreateDoubtDto } from './dto/create-doubt.dto';
import { CreateDoubtAnswerDto } from './dto/create-doubtAnswer.dto';
import { UpdateDoubtDto } from './dto/update-doubt.dto';
import { UpdateDoubtAnswerDto } from './dto/update-doubtAnswer.dto';
import { DoubtDocument as Doubt } from './schema/doubt.schema';
import { DoubtAnswer } from './schema/doubtAnswer.schema';

@ApiTags('Doubt')
@Controller('doubt')
export class DoubtController {
  constructor(private doubtService: DoubtService) {}

  // Retrieve doubts list
  @Get()
  async getAllDoubts() {
    return await this.doubtService.getAllDoubts();
  }

  // Retrieve doubt by id
  @Get('/get/:doubtId')
  async getDoubtById(@Param('doubtId') doubtId: Schema.Types.ObjectId) {
    return await this.doubtService.getDoubtById(doubtId);
  }

  // get doubts for courses
  @Get('/get/:courseId')
  async getDoubtsForSelectedCourse(
    @Param('courseId') courseId: Schema.Types.ObjectId,
  ): Promise<Doubt> {
    return await this.doubtService.findDoubtsForSelectedCourse(courseId);
  }

  // add a new doubt
  @Post('/new/:courseId')
  async askNewDoubt(
    @Param('courseId') courseId: Schema.Types.ObjectId,
    @Body() createDoubtDto: CreateDoubtDto,
  ): Promise<Doubt> {
    return await this.doubtService.addNewDoubt(courseId, createDoubtDto);
  }

  // edit the doubt by Id
  @Put('/updateDoubt/:courseId/:doubtId')
  async editDoubt(
    @Param('courseId') courseId: Schema.Types.ObjectId,
    @Param('doubtId') doubtId: Schema.Types.ObjectId,
    @Body() updateDoubtDto: UpdateDoubtDto,
  ): Promise<Doubt> {
    return await this.doubtService.editDoubt(courseId, doubtId, updateDoubtDto);
  }

  // Delete a doubt by Id
  @Delete('/deleteDoubt/:courseId/:doubtId')
  async deleteDoubt(
    @Param('courseId') courseId: Schema.Types.ObjectId,
    @Param('doubtId') doubtId: Schema.Types.ObjectId,
  ): Promise<Doubt> {
    return await this.doubtService.deleteDoubt(courseId, doubtId);
  }

  // add a new doubtAnswer
  @Post('/newAnswer/:doubtId')
  async askNewDoubtAnswer(
    @Param('doubtId') doubtId: Schema.Types.ObjectId,
    @Body() createDoubtAnswerDto: CreateDoubtAnswerDto,
  ): Promise<DoubtAnswer> {
    return await this.doubtService.addNewDoubtAnswer(
      doubtId,
      createDoubtAnswerDto,
    );
  }

  // edit the doubtAnswer by Id
  @Put('/updateDoubtAnswer/:doubtId/:doubtAnswerId')
  async editDoubtAnswer(
    @Param('doubtId') doubtId: Schema.Types.ObjectId,
    @Param('doubtAnswerId') doubtAnswerId: Schema.Types.ObjectId,
    @Body() updateDoubtAnswerDto: UpdateDoubtAnswerDto,
  ): Promise<DoubtAnswer> {
    return await this.doubtService.editDoubtAnswer(
      doubtId,
      doubtAnswerId,
      updateDoubtAnswerDto,
    );
  }

  // Delete a doubtAnswerby Id
  @Delete('/deleteDoubtAnswer/:doubtId/:doubtAnswerId')
  async deleteDoubtAnswer(
    @Param('doubtId') doubtId: Schema.Types.ObjectId,
    @Param('doubtAnswerId') doubtAnswerId: Schema.Types.ObjectId,
  ): Promise<DoubtAnswer> {
    return await this.doubtService.deleteDoubtAnswer(doubtId, doubtAnswerId);
  }
}

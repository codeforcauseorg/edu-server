import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Schema } from 'mongoose';
import { DoubtService } from './doubt.service';
import { CreateDoubtDto } from './dto/create-doubt.dto';
import { CreateDoubtAnswerDto } from './dto/create-doubtAnswer.dto';
import { UpdateDoubtDto } from './dto/update-doubt.dto';
import { UpdateDoubtAnswerDto } from './dto/update-doubtAnswer.dto';
import { DoubtDocument as Doubt } from './schema/doubt.schema';
import { DoubtAnswer } from './schema/doubtAnswer.schema';
import responsedoc from './docUtils/apidoc';
import { courseId, doubtId, doubtAnswerId } from './docUtils/doubt.paramdocs';

@ApiTags('Doubt')
@Controller('doubt')
export class DoubtController {
  constructor(private doubtService: DoubtService) {}

  // add a new doubt
  @Post('/new/:courseId')
  @ApiParam(courseId)
  @ApiCreatedResponse(responsedoc.addDoubt)
  async askNewDoubt(
    @Param('courseId') courseId: Schema.Types.ObjectId,
    @Body() createDoubtDto: CreateDoubtDto,
  ): Promise<Doubt> {
    return await this.doubtService.addNewDoubt(courseId, createDoubtDto);
  }

  // edit the doubt by Id
  @Put('/updateDoubt/:courseId/:doubtId')
  @ApiParam(courseId)
  @ApiParam(doubtId)
  @ApiOkResponse(responsedoc.updateDoubt)
  async editDoubt(
    @Param('courseId') courseId: Schema.Types.ObjectId,
    @Param('doubtId') doubtId: Schema.Types.ObjectId,
    @Body() updateDoubtDto: UpdateDoubtDto,
  ): Promise<Doubt> {
    return await this.doubtService.editDoubt(courseId, doubtId, updateDoubtDto);
  }

  // Delete a doubt by Id
  @Delete('/deleteDoubt/:courseId/:doubtId')
  @ApiParam(courseId)
  @ApiParam(doubtId)
  @ApiOkResponse(responsedoc.deleteDoubt)
  async deleteDoubt(
    @Param('courseId') courseId: Schema.Types.ObjectId,
    @Param('doubtId') doubtId: Schema.Types.ObjectId,
  ): Promise<Doubt> {
    return await this.doubtService.deleteDoubt(courseId, doubtId);
  }

  // add a new doubtAnswer
  @Post('/newAnswer/:doubtId')
  @ApiParam(doubtId)
  @ApiCreatedResponse(responsedoc.addDoubtAnswer)
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
  @ApiParam(doubtId)
  @ApiParam(doubtAnswerId)
  @ApiOkResponse(responsedoc.updateDoubtAnswer)
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
  @ApiParam(doubtId)
  @ApiParam(doubtAnswerId)
  @ApiOkResponse(responsedoc.deleteDoubtAnswer)
  async deleteDoubtAnswer(
    @Param('doubtId') doubtId: Schema.Types.ObjectId,
    @Param('doubtAnswerId') doubtAnswerId: Schema.Types.ObjectId,
  ): Promise<DoubtAnswer> {
    return await this.doubtService.deleteDoubtAnswer(doubtId, doubtAnswerId);
  }
}

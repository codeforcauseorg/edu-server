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
import { courseId, doubtAnswerId, doubtId } from './docUtils/doubt.paramdocs';
import { Schema } from 'mongoose';
import responsedoc from './docUtils/apidoc';
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

  @Get()
  @ApiOkResponse(responsedoc.getAllDoubts)
  @ApiOperation({ summary: 'Retrieve doubts list' })
  async getAllDoubts() {
    return await this.doubtService.getAllDoubts();
  }

  @Get('/get/:doubtId')
  @ApiParam(doubtId)
  @ApiOkResponse(responsedoc.getDoubtById)
  @ApiOperation({ summary: 'Retrieve doubt by id' })
  async getDoubtById(@Param('doubtId') doubtId: Schema.Types.ObjectId) {
    return await this.doubtService.getDoubtById(doubtId);
  }

  @Get('/get/:courseId')
  @ApiParam(courseId)
  @ApiOkResponse(responsedoc.getDoubtById)
  @ApiOperation({ summary: 'Retrieve doubts for courses' })
  async getDoubtsForSelectedCourse(
    @Param('courseId') courseId: Schema.Types.ObjectId,
  ): Promise<Doubt> {
    return await this.doubtService.findDoubtsForSelectedCourse(courseId);
  }

  @Post('/new/:courseId')
  @ApiParam(courseId)
  @ApiCreatedResponse(responsedoc.addDoubt)
  @ApiOperation({ summary: 'Add a new doubt' })
  async askNewDoubt(
    @Param('courseId') courseId: Schema.Types.ObjectId,
    @Body() createDoubtDto: CreateDoubtDto,
  ): Promise<Doubt> {
    return await this.doubtService.addNewDoubt(courseId, createDoubtDto);
  }

  @Put('/updateDoubt/:courseId/:doubtId')
  @ApiParam(courseId)
  @ApiParam(doubtId)
  @ApiCreatedResponse(responsedoc.updateDoubt)
  @ApiOperation({ summary: 'Edit doubt by id' })
  async editDoubt(
    @Param('courseId') courseId: Schema.Types.ObjectId,
    @Param('doubtId') doubtId: Schema.Types.ObjectId,
    @Body() updateDoubtDto: UpdateDoubtDto,
  ): Promise<Doubt> {
    return await this.doubtService.editDoubt(courseId, doubtId, updateDoubtDto);
  }

  @Delete('/deleteDoubt/:courseId/:doubtId')
  @ApiParam(courseId)
  @ApiParam(doubtId)
  @ApiCreatedResponse(responsedoc.deleteDoubt)
  async deleteDoubt(
    @Param('courseId') courseId: Schema.Types.ObjectId,
    @Param('doubtId') doubtId: Schema.Types.ObjectId,
  ): Promise<Doubt> {
    return await this.doubtService.deleteDoubt(courseId, doubtId);
  }

  @Post('/newAnswer/:doubtId')
  @ApiParam(doubtId)
  @ApiCreatedResponse(responsedoc.addDoubtAnswer)
  @ApiOperation({ summary: 'Add a new doubt Answer' })
  async askNewDoubtAnswer(
    @Param('doubtId') doubtId: Schema.Types.ObjectId,
    @Body() createDoubtAnswerDto: CreateDoubtAnswerDto,
  ): Promise<DoubtAnswer> {
    return await this.doubtService.addNewDoubtAnswer(
      doubtId,
      createDoubtAnswerDto,
    );
  }

  @Put('/updateDoubtAnswer/:doubtId/:doubtAnswerId')
  @ApiParam(doubtAnswerId)
  @ApiParam(doubtId)
  @ApiCreatedResponse(responsedoc.updateDoubtAnswer)
  @ApiOperation({ summary: 'Edit doubt Answer by id' })
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

  @Delete('/deleteDoubtAnswer/:doubtId/:doubtAnswerId')
  @ApiParam(doubtAnswerId)
  @ApiParam(doubtId)
  @ApiCreatedResponse(responsedoc.deleteDoubtAnswer)
  @ApiOperation({ summary: 'Delete doubt Answer by id' })
  async deleteDoubtAnswer(
    @Param('doubtId') doubtId: Schema.Types.ObjectId,
    @Param('doubtAnswerId') doubtAnswerId: Schema.Types.ObjectId,
  ): Promise<DoubtAnswer> {
    return await this.doubtService.deleteDoubtAnswer(doubtId, doubtAnswerId);
  }
}

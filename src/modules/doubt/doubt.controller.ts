import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { DoubtService } from './doubt.service';
import { CreateDoubtDto } from './dto/create-doubt.dto';
import { Doubt } from './interfaces/doubt.interface';
@Controller('doubt')
export class DoubtController {
  constructor(private doubtService: DoubtService) {}

  @Get()
  async getAllDoubts() {
    return await this.doubtService.getAllDoubts();
  }

  @Get('/:id')
  async getDoubtbyID(@Param('id') id: string) {
    return await this.doubtService.findDoubtById(id);
  }

  @ApiCreatedResponse({
    type: CreateDoubtDto,
    description: 'Create a new Doubt',
  })
  @UsePipes(new ValidationPipe())
  @Post('/new')
  async askNewDoubt(@Body() createDoubt: CreateDoubtDto): Promise<Doubt> {
    return await this.doubtService.addNewDoubt(createDoubt);
  }
}

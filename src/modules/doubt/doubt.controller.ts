import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DoubtService } from './doubt.service';
import { DoubtDTO } from './dto/create-doubt.dto';

@ApiTags('Doubt')
@Controller('doubt')
export class DoubtController {
  constructor(private doubtService: DoubtService) {}

  @Get()
  async getAllDoubts(): Promise<DoubtDTO[]> {
    return await this.doubtService.getAllDoubts();
  }

  @Get('/:id')
  async getDoubtbyID(@Param('id') id: string): Promise<DoubtDTO> {
    return await this.doubtService.findDoubtById(id);
  }

  @Post('/new')
  async askNewDoubt(@Body() createDoubt) {
    return await this.doubtService.addNewDoubt(createDoubt);
  }
}

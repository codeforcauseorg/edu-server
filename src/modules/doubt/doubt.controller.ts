import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DoubtService } from './doubt.service';

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

  @Post('/new')
  async askNewDoubt(@Body() createDoubt) {
    return await this.doubtService.addNewDoubt(createDoubt);
  }

}

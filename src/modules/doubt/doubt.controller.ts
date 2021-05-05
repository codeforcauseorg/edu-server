import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DoubtService } from './doubt.service';
import { CreateDoubtDto } from './dto/create-doubt.dto';
// import { ApiCreatedResponse } from '@nestjs/swagger';
import { Doubt } from './interfaces/doubt.interface';
// import { Doubt as DModel, DoubtSchema } from '../../schemas/doubt.schema'
@Controller('doubt')
export class DoubtController {
  constructor(private doubtService: DoubtService) { }

  @Get()
  async getAllDoubts() {
    return await this.doubtService.getAllDoubts();
  }

  @Get('/:id')
  async getDoubtbyID(@Param('id') id: string) {
    return await this.doubtService.findDoubtById(id);
  }

  // @ApiCreatedResponse({ type: DModel, description: 'Create a new Doubt' })
  // @UsePipes(new ValidationPipe({ expectedType: CreateDoubtDto }))
  @Post('/new')
  async askNewDoubt(@Body() createDoubt: CreateDoubtDto): Promise<Doubt> {
    return await this.doubtService.addNewDoubt(createDoubt);
  }
}

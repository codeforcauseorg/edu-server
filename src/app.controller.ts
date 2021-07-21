import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  getHey(@Req() request): string {
    return 'Hello ' + request['user']?.email + '!';
  }
}

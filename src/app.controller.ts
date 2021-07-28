import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from 'middleware/roles.guard';
import { Roles } from 'middleware/role.decorator';
import { Role } from './roles/role.enum';

@ApiBearerAuth()
@Controller()
@UseGuards(RolesGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  @Roles(Role.STUDENT)
  getHey(@Req() request): string {
    return 'Hello ' + request['user']?.email + request['user']?.role + '!';
  }
}

import { Controller, Get, Post, Inject, UseGuards } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { LeadersService } from './leaders.service';
 
@Controller("leaders")
export class LeadersController {
  constructor(
    private readonly leadersService: LeadersService,
  ) { }
 
  @Get()
  async getLeader() {
    return this.leadersService.getLeaders();
  }

  @Post("application")
  submitApplication() {
    return "Hello Auth"
  }
}
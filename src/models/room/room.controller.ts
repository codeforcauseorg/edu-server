import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
// import { RoomDocument as Room } from '../../schemas/room.schema';
import { RoomService } from './room.service';
import { CreateRoomeDto } from './dto/create-room.dto';

@Controller('api/rooms')
export class RoomsController {
  constructor(private roomeService: RoomService) {}

  @Get()
  find(@Query('q') q) {
    return this.roomeService.findRoom(q);
  }

  @Get('/:id')
  findById(@Param('id') id: string) {
    return this.roomeService.findRoomById(id);
  }

  @Post()
  save(@Body() newRoom: CreateRoomeDto) {
    return this.roomeService.addRoom(newRoom);
  }
}

import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
// import { RoomDocument as Room } from '../../schemas/room.schema';
import { RoomService } from './room.service';
import { CreateRoomeDto } from './dto/create-room.dto';

@Controller('api/rooms')
export class RoomsController {
  constructor(private roomeService: RoomService) {}
  // constructor(@InjectModel('Room') private readonly roomModel: Model<Room>) {}

  @Get()
  find(@Query('q') q) {
    return this.roomeService.findRoom(q);
    //return this.roomModel.find({ name: { $regex: new RegExp(`.*${q}.*`) } });
    //else return this.roomModel.find();
  }

  @Get('/:id')
  findById(@Param('id') id: string) {
    return this.roomeService.findRoomById(id);
    //return this.roomModel.findById(id);
  }

  @Post()
  save(@Body() newRoom: CreateRoomeDto) {
    return this.roomeService.addRoom(newRoom);
    //return item.id
    //? this.roomModel.findByIdAndUpdate(item.id, item, { new: true })
    //: this.roomModel.create(item);
  }
}

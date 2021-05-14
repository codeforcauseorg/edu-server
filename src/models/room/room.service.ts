import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoomDocument as Room } from '../../schemas/room.schema';
import { CreateRoomeDto } from './dto/create-room.dto';

@Injectable()
export class RoomService {
  constructor(@InjectModel('Room') private readonly roomModel: Model<Room>) {}

  // fetch all courses
  async findRoom(q) {
    if (q) {
      return this.roomModel.find({ name: { $regex: new RegExp(`.*${q}.*`) } });
    } else return this.roomModel.find();
  }

  async findRoomById(id: string): Promise<Room> {
    return this.roomModel.findById(id);
  }

  // add course
  async addRoom(newDoubt: CreateRoomeDto): Promise<Room> {
    try {
      return await new this.roomModel(newDoubt).save();
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}

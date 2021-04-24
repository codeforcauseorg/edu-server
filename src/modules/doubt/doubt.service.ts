import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import e from 'express';
import { Model } from 'mongoose';
import { Doubt } from './interfaces/doubt.interface';

@Injectable()
export class DoubtService {
  constructor(
    @InjectModel('Doubt') private readonly DoubtModel: Model<Doubt>,
  ) { }

  async getAllDoubts(): Promise<Doubt[]> {
    return await this.DoubtModel.find().exec();
  }

  async findDoubtById(id: string): Promise<Doubt> {
    try {
      return await this.DoubtModel.findById(id).exec();
    } catch (e) {
      throw new NotFoundException("doubt not found!");
    }
  }

  async addNewDoubt(newDoubt) {
    try {
      return await new this.DoubtModel(newDoubt).save();
    } catch (e) {
      throw new HttpException({status: HttpStatus.BAD_REQUEST}, HttpStatus.BAD_REQUEST)
    }
  }
}

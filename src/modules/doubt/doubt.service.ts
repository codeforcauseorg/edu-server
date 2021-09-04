import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Scope,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { CreateDoubtDto } from './dto/create-doubt.dto';
import { DoubtDocument as Doubt } from './schema/doubt.schema';
import { Course } from '../course/schema/course.schema';
import { UpdateDoubtDto } from './dto/update-doubt.dto';
import { DoubtAnswer } from './schema/doubtAnswer.schema';
import { UpdateDoubtAnswerDto } from './dto/update-doubtAnswer.dto';
import { CreateDoubtAnswerDto } from './dto/create-doubtAnswer.dto';
import { User } from '../user/schema/user.schema';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class DoubtService {
  constructor(
    @InjectModel('Doubt') private readonly DoubtModel: Model<Doubt>,
    @InjectModel('Course') private readonly CourseModel: Model<Course>,
    @InjectModel('User') private readonly UserModel: Model<User>,
    @InjectModel('DoubtAnswer')
    private readonly DoubtAnswerModel: Model<DoubtAnswer>,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  // fetch all Doubts
  async getAllDoubts(skip: string) {
    try {
      const skipNum = parseInt(skip, 10);
      const doubts = await this.DoubtModel.find(
        {},
        {},
        { skip: skipNum, limit: 10 },
      )
        .populate('answers')
        .lean();
      return doubts;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  // Get a single Doubt
  async getDoubtById(doubtId: Schema.Types.ObjectId) {
    try {
      const doubt = await this.DoubtModel.findById(doubtId)
        .populate('answers')
        .lean();

      if (doubt) {
        return doubt;
      }
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
    throw new NotFoundException('Error, doubt not found');
  }

  // add a new doubt
  async addNewDoubt(
    courseId: Schema.Types.ObjectId,
    createDoubtDto: CreateDoubtDto,
  ) {
    try {
      const user = await this.UserModel.findOne({
        email: this.request['user']['email'],
      });
      const course = await this.CourseModel.findById(courseId);
      if (course) {
        const doubtToBeCreated = {
          ...createDoubtDto,
          photoUrl: user.photoUrl,
        };
        const newDoubt = await new this.DoubtModel(doubtToBeCreated).save();
        course.doubts.push(newDoubt);
        await course.save();
        return newDoubt.populate('answers');
      } else {
        throw new NotFoundException(
          'The course id is invalid or the course no longer exists',
        );
      }
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  // edit the doubt by Id
  async editDoubt(
    courseId: Schema.Types.ObjectId,
    doubtId: Schema.Types.ObjectId,
    updateDoubtDto: UpdateDoubtDto,
  ) {
    try {
      const course = await this.CourseModel.findById(courseId);
      if (course) {
        let updatedDoubt = null;
        updatedDoubt = await this.DoubtModel.findByIdAndUpdate(
          doubtId,
          updateDoubtDto,
          { new: true },
        ).lean();
        if (updatedDoubt) {
          return updatedDoubt;
        } else {
          throw new NotFoundException(
            'The doubt id is invalid or the doubt no longer exists',
          );
        }
      } else {
        throw new NotFoundException(
          'The course id is invalid or the course no longer exists',
        );
      }
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  // Delete a doubt by Id
  async deleteDoubt(
    courseId: Schema.Types.ObjectId,
    doubtId: Schema.Types.ObjectId,
  ): Promise<any> {
    try {
      const course = await this.CourseModel.findById(courseId);
      if (course) {
        let deletedDoubt = null;
        deletedDoubt = await this.DoubtModel.findByIdAndRemove(doubtId)
          .populate('answers')
          .lean();
        if (deletedDoubt) {
          return deletedDoubt;
        } else {
          throw new NotFoundException(
            'The doubt id is invalid or the doubt no longer exists',
          );
        }
      } else {
        throw new NotFoundException(
          'The course id is invalid or the course no longer exists',
        );
      }
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  // add a new doubtAnswer
  async addNewDoubtAnswer(
    doubtId: Schema.Types.ObjectId,
    createDoubtAnswerDto: CreateDoubtAnswerDto,
  ) {
    try {
      const doubt = await this.DoubtModel.findById(doubtId);
      const user = await this.UserModel.findOne({
        email: this.request['user']['email'],
      });
      if (doubt) {
        const doubtAnswerToBeCreated = {
          ...createDoubtAnswerDto,
          photoUrl: user.photoUrl,
        };
        const newDoubtAnswer = await new this.DoubtAnswerModel(
          doubtAnswerToBeCreated,
        ).save();
        doubt.answers.push(newDoubtAnswer);
        await doubt.save();
        return newDoubtAnswer;
      } else {
        throw new NotFoundException(
          'The doubt id is invalid or the doubt no longer exists',
        );
      }
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  // edit the doubtAnswer by Id
  async editDoubtAnswer(
    doubtId: Schema.Types.ObjectId,
    doubtAnswerId: Schema.Types.ObjectId,
    updateDoubtAnswerDto: UpdateDoubtAnswerDto,
  ) {
    try {
      const doubt = await this.DoubtModel.findById(doubtId);
      if (doubt) {
        let updatedDoubt = null;
        updatedDoubt = await this.DoubtAnswerModel.findByIdAndUpdate(
          doubtAnswerId,
          updateDoubtAnswerDto,
          { new: true },
        );
        if (updatedDoubt) {
          return updatedDoubt;
        } else {
          throw new NotFoundException(
            'The doubtAnswerId id is invalid or the doubtAnswerId no longer exists',
          );
        }
      } else {
        throw new NotFoundException(
          'The doubt id is invalid or the doubt no longer exists',
        );
      }
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  // Delete a doubtAnswer by Id
  async deleteDoubtAnswer(
    doubtId: Schema.Types.ObjectId,
    doubtAnswerId: Schema.Types.ObjectId,
  ): Promise<any> {
    try {
      const doubt = await this.DoubtModel.findById(doubtId);
      if (doubt) {
        let deletedDoubt = null;
        deletedDoubt = await this.DoubtAnswerModel.findByIdAndRemove(
          doubtAnswerId,
        );
        if (deletedDoubt) {
          return deletedDoubt;
        } else {
          throw new NotFoundException(
            'The doubtAnswerId id is invalid or the doubtAnswerId no longer exists',
          );
        }
      } else {
        throw new NotFoundException(
          'The doubt id is invalid or the doubt no longer exists',
        );
      }
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  // get doubts for selected courses
  async findDoubtsForSelectedCourse(
    courseId: Schema.Types.ObjectId,
  ): Promise<any> {
    try {
      const Course = await this.CourseModel.findById(courseId)
        .populate({
          path: 'doubts',
          model: 'Doubt',
          populate: {
            path: 'answers',
            model: 'DoubtAnswer',
          },
        })
        .exec();
      if (Course) {
        const { doubts } = Course;
        return doubts;
      } else {
        throw new NotFoundException('course not found');
      }
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}

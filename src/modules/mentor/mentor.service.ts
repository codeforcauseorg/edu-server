import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Model, Schema } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MentorDocument as Mentor } from './schema/mentor.schema';
import { CourseDocument as Course } from '../../modules/course/schema/course.schema';
import { CreateMentorDTO } from './dto/create-mentor.dto';
import { UpdateMentorDTO } from './dto/update-mentor.dto';

@Injectable()
export class MentorService {
  constructor(
    @InjectModel('Mentor') private readonly mentorModel: Model<Mentor>,
    @InjectModel('Course') private readonly courseModel: Model<Course>,
  ) {}

  // fetch all Mentors
  async getAllMentor(): Promise<Mentor[]> {
    try {
      const mentors = await this.mentorModel.find().exec();
      return mentors;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  // Get a single Mentor
  async findMentorById(mentorId: Schema.Types.ObjectId): Promise<Mentor> {
    try {
      const mentor = await this.mentorModel.findById(mentorId);

      if (mentor) {
        return mentor;
      }
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
    throw new NotFoundException('Error');
  }

  // post a single Mentor
  async addMentor(CreateMentorDTO: CreateMentorDTO): Promise<Mentor> {
    try {
      const newMentor = await new this.mentorModel(CreateMentorDTO);
      return newMentor.save();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  // Edit Mentor details
  async updateMentor(
    mentorId: Schema.Types.ObjectId,
    UpdateMentorDTO: UpdateMentorDTO,
  ): Promise<Mentor> {
    try {
      return await this.mentorModel
        .findByIdAndUpdate(mentorId, UpdateMentorDTO, {
          new: true,
          useFindAndModify: false,
        })
        .exec();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  // Delete a Mentor
  async deleteMentor(mentorId: Schema.Types.ObjectId): Promise<any> {
    try {
      return await this.mentorModel.findByIdAndRemove(mentorId);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  // assign course to mentor
  async assignCourseToMentor(
    mentorId: Schema.Types.ObjectId,
    courseId: Schema.Types.ObjectId,
  ): Promise<any> {
    try {
      const mentor = await this.mentorModel.findById(mentorId);
      if (mentor) {
        const doesCourseExists = await this.courseModel.exists({
          _id: courseId['courseId'],
        });
        if (doesCourseExists) {
          const isAlreadypresent = mentor.courses.includes(
            courseId['courseId'],
          );
          if (!isAlreadypresent) {
            mentor.courses.push(courseId['courseId']);
            await mentor.save();
            return mentor;
          } else {
            throw new ConflictException('Course Already Assigned');
          }
        } else {
          throw new NotFoundException('Course not found');
        }
      } else {
        throw new NotFoundException('Mentor not found');
      }
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}

import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AnnouncementDocument as Announcement } from './schema/announcement.schema';
import { CreateAnnouncementDTO } from './dto/create-announcement.dto';
import { UpdateAnnouncementDTO } from './dto/update-announcement.dto';

@Injectable()
export class AnnouncementService {
  constructor(
    @InjectModel('Announcement')
    private readonly AnnouncementModel: Model<Announcement>,
  ) {}

  // fetch all Announcements
  async getAllAnnouncement(): Promise<Announcement[]> {
    try {
      const Announcements = await this.AnnouncementModel.find().exec();
      return Announcements;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  // Get a single Announcement
  async getAnnouncement(announcementId): Promise<Announcement> {
    try {
      const Announcement = await this.AnnouncementModel.findById(
        announcementId,
      );
      if (Announcement) {
        return Announcement;
      }
    } catch (e) {
      throw new InternalServerErrorException(e);
    }

    throw new NotFoundException('Announcement not found');
  }

  // post a single Announcement
  async addAnnouncement(
    CreateAnnouncementDTO: CreateAnnouncementDTO,
  ): Promise<Announcement> {
    try {
      const newAnnouncement = await new this.AnnouncementModel(
        CreateAnnouncementDTO,
      );
      await newAnnouncement.save();
      return newAnnouncement;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  // Edit Announcement details
  async updateAnnouncement(
    announcementId,
    updateAnnouncementDTO: UpdateAnnouncementDTO,
  ): Promise<Announcement> {
    try {
      const updatedAnnouncement =
        await this.AnnouncementModel.findByIdAndUpdate(
          announcementId,
          updateAnnouncementDTO,
          { new: true },
        );
      if (updatedAnnouncement) {
        return updatedAnnouncement;
      }
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
    throw new NotFoundException('Announcement not found!');
  }

  // Delete a Announcement
  async deleteAnnouncement(announcementId): Promise<any> {
    try {
      const deletedAnnouncement =
        await this.AnnouncementModel.findByIdAndRemove(announcementId);
      if (deletedAnnouncement) {
        return deletedAnnouncement;
      }
      throw new NotFoundException('Announcement not found!');
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}

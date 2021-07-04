import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AnnouncementDocument = Announcement & Document;

@Schema({ timestamps: true })
export class Announcement {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: false })
  read: boolean;

  @Prop({ required: true })
  created_by: string;
}

export const AnnouncementSchema = SchemaFactory.createForClass(Announcement);

AnnouncementSchema.methods.toJSON = function () {
  const announcementObject = this.toObject();
  announcementObject.id = announcementObject._id;

  delete announcementObject.__v;
  delete announcementObject._id;

  return announcementObject;
};

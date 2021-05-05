import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DoubtSchema } from '../../schemas/doubt.schema';
import { DoubtController } from './doubt.controller';
import { DoubtService } from './doubt.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Doubt', schema: DoubtSchema }]),
  ],
  controllers: [DoubtController],
  providers: [DoubtService],
})
export class DoubtModule {}

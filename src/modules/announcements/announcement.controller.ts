import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AnnouncementService } from './announcement.service'; //eslint-disable-line 
import { CreateAnnouncementDTO } from './dto/create-announcement.dto'; //eslint-disable-line 
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateAnnouncementDTO } from './dto/update-announcement.dto';
import responsedoc from './docUtils/apidoc';
import { announcementId } from './docUtils/announcement.paramdocs';
import { RolesGuard } from '../../middleware/roles.guard';
import { Roles } from '../../middleware/role.decorator';
import { Role } from '../../roles/role.enum';

@ApiTags('Announcement')
@Controller('Announcement')
@UseGuards(RolesGuard)
export class AnnouncementController {
  constructor(private announcementService: AnnouncementService) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'add an Announcement' })
  @ApiCreatedResponse(responsedoc.addAnnouncement)
  async addAnnouncement(@Body() CreateAnnouncementDTO: CreateAnnouncementDTO) {
    return await this.announcementService.addAnnouncement(
      CreateAnnouncementDTO,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve Announcements list' })
  @ApiOkResponse(responsedoc.getAllAnnouncement)
  async getAllAnnouncement() {
    return await this.announcementService.getAllAnnouncement();
  }

  @Get('/:announcementId')
  @ApiParam(announcementId)
  @ApiOperation({
    summary: 'Fetch a particular Announcement using ID',
  })
  @ApiOkResponse(responsedoc.getAnnouncement)
  async getAnnouncement(@Param('announcementId') announcementId: string) {
    return await this.announcementService.getAnnouncement(announcementId);
  }

  @Put('/:announcementId')
  @Roles(Role.ADMIN)
  @ApiParam(announcementId)
  @ApiOperation({ summary: 'update Announcement by Id' })
  @ApiOkResponse(responsedoc.updateAnnouncement)
  async updateAnnouncement(
    @Param('announcementId') announcementId: string,
    @Body() updateAnnouncementDTO: UpdateAnnouncementDTO,
  ) {
    return await this.announcementService.updateAnnouncement(
      announcementId,
      updateAnnouncementDTO,
    );
  }

  @Delete('/:announcementId')
  @Roles(Role.ADMIN)
  @ApiParam(announcementId)
  @ApiOperation({ summary: 'Delete an Announcement by Id' })
  @ApiOkResponse(responsedoc.deleteAnnouncement)
  async deleteAnnouncement(@Param('announcementId') announcementId: string) {
    return await this.announcementService.deleteAnnouncement(announcementId);
  }
}

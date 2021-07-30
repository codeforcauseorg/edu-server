import { Test, TestingModule } from '@nestjs/testing';
import { AnnouncementController } from './announcement.controller';
import { AnnouncementService } from './announcement.service';
import { UpdateAnnouncementDTO } from './dto/update-announcement.dto';
import { CreateAnnouncementDTO } from './dto/create-announcement.dto';
const mockAnnouncement = {
  id: '60c5eafba5940a4964d5ea96',
  title: ' New Course on react ',
  read: false,
  added_by: ' John Doe ',
  description:
    'The course gives a hands on learning experience on Rest APIs and Javascript',
};

describe('AnnouncementController', () => {
  let controller: AnnouncementController;
  let service: AnnouncementService;

  const mockAnnouncementvalue = {
    getAllAnnouncement: jest.fn().mockResolvedValue([mockAnnouncement]),
    getAnnouncement: jest
      .fn()
      .mockImplementation((id: string) => ({ ...mockAnnouncement, id })),
    editAnnouncement: jest.fn().mockImplementation((uid, body) => ({
      ...mockAnnouncement,
      id: uid,
      ...body,
    })),
    addAnnouncement: jest.fn().mockResolvedValue([mockAnnouncement]),
    updateAnnouncement: jest.fn().mockResolvedValue([mockAnnouncement]),
    deleteAnnouncement: jest.fn().mockResolvedValue([mockAnnouncement]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnnouncementController],
      providers: [
        {
          provide: AnnouncementService,
          useValue: mockAnnouncementvalue,
        },
      ],
    }).compile();

    controller = module.get<AnnouncementController>(AnnouncementController);
    service = module.get<AnnouncementService>(AnnouncementService);
  });

  // check if controller is defined
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Course', () => {
    // Announcement creation
    it('Announcement should be created', async () => {
      await expect(controller.getAllAnnouncement()).resolves.toEqual([
        mockAnnouncement,
      ]);
    });

    // Announcement found by id
    it('Announcement should be found by ID', async () => {
      const id = '60c5eafba5940a4964d5ea96';
      await expect(controller.getAnnouncement(id)).resolves.toEqual({
        ...mockAnnouncement,
        id,
      });
      expect(service.getAnnouncement).toHaveBeenCalledWith(id);
    });

    // retrieved value not equal as id if different/does not exist
    it('Announcement should not be equal to the returned value if  ID does not exist', async () => {
      const id = '60c5eafba5940a4884d5fa96';
      const idFix = '60c5eafba5940a4964d5ea96';
      await expect(controller.getAnnouncement(id)).resolves.not.toEqual({
        ...mockAnnouncement,
        idFix,
      });
      expect(service.getAnnouncement).toHaveBeenCalledWith(id);
    });

    // Announcement should be created
    it('Announcement should be created', async () => {
      const dto: CreateAnnouncementDTO = {
        title: ' New Course on react ',
        read: false,
        added_by: ' John Doe ',
        description:
          'The course gives a hands on learning experience on Rest APIs and Javascript',
      };
      await expect(controller.addAnnouncement(dto)).resolves.not.toBeNull();
      expect(service.addAnnouncement).toHaveBeenCalledWith(dto);
    });

    // Announcement should be updated
    it('Announcement should be updated', async () => {
      const id = '60c5eafba5940a4964d5ea96';
      const dto: UpdateAnnouncementDTO = {
        title: ' New Course on react ',
        read: false,
        added_by: ' John Doe ',
        description:
          'The course gives a hands on learning experience on Rest APIs and Javascript',
      };
      await expect(controller.updateAnnouncement(id, dto)).resolves.toEqual([
        {
          id,
          ...dto,
        },
      ]);
      expect(service.updateAnnouncement).toHaveBeenCalledWith(id, dto);
    });

    // retrieved value not equal as id if different/does not exist
    it('Announcement should not be updated and be equal to the returned value if  ID does not exist', async () => {
      const id = '60c5eafba5940a4884d5fa96';
      const idFix = '60c5eafba5940a4964d5ea96';
      const dto: UpdateAnnouncementDTO = {
        title: ' New Course on react ',
        read: false,
        added_by: ' John Doe ',
        description:
          'The course gives a hands on learning experience on Rest APIs and Javascript',
      };
      await expect(controller.updateAnnouncement(id, dto)).resolves.not.toEqual(
        {
          ...mockAnnouncement,
          idFix,
        },
      );
      expect(service.updateAnnouncement).toHaveBeenCalledWith(id, dto);
    });

    //  Announcement shpuld be deleted
    it('Announcement should be deleted', async () => {
      const id = '60c5eafba5940a4964d5ea96';
      await expect(controller.deleteAnnouncement(id)).resolves.toEqual([
        {
          ...mockAnnouncement,
        },
      ]);
      expect(service.deleteAnnouncement).toHaveBeenCalledWith(id);
    });
  });

  // retrieved value not equal as id if different/does not exist
  it('Announcement should not be deleted and be equal to the returned value if  ID does not exist', async () => {
    const id = '60c5eafba5940a4884d5fa96';
    const idFix = '60c5eafba5940a4964d5ea96';
    await expect(controller.deleteAnnouncement(id)).resolves.not.toEqual({
      ...mockAnnouncement,
      idFix,
    });
    expect(service.deleteAnnouncement).toHaveBeenCalledWith(id);
  });
});

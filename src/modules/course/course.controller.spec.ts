import { Test, TestingModule } from '@nestjs/testing';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import * as mongoose from 'mongoose';
const mockCourse = {
  schedule: ['60cda21c44ce7c2e3c4a43e8', '60cdb0f4a358e5603c6bedd4'],
  assignments: [],
  mentor: [],
  active: false,
  name: 'devesh K',
  price: 0,
  coupons: 0,
  video_num: 0,
  duration: '11.5 hours',
  start_date: '2020-02-05T06:35:22.000Z',
  end_date: '2020-02-05T06:35:22.000Z',
  sharable_link: '88900xyz.com',
  id: '60c5eafba5940a4964d5ea96',
};

describe('CourseController', () => {
  let controller: CourseController;
  let service: CourseService;

  const mockCoursevalue = {
    getAllCourses: jest.fn().mockResolvedValue([mockCourse]),
    findCourseById: jest
      .fn()
      .mockImplementation((id: string) => ({ ...mockCourse, id })),
    editCourse: jest.fn().mockImplementation((uid, body) => ({
      ...mockCourse,
      id: uid,
      ...body,
    })),
    // deleteCourse: jest.fn().mockResolvedValue([mockCourse]),
    // getEnrolledCourses: jest.fn().mockResolvedValue([mockCourse]),
    // addCourse: jest.fn().mockResolvedValue([mockCourse]),
    // getWishList: jest.fn().mockResolvedValue([mockCourse]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseController],
      providers: [
        {
          provide: CourseService,
          useValue: mockCoursevalue,
        },
      ],
    }).compile();

    controller = module.get<CourseController>(CourseController);
    service = module.get<CourseService>(CourseService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Course', () => {
    it('should be created', async () => {
      await expect(controller.getAllCourses()).resolves.toEqual([mockCourse]);
    });

    it('should be found by ID', async () => {
      const id = new mongoose.Schema.Types.ObjectId('22', 0, 'rtex');
      await expect(controller.getSelectedCourse(id)).resolves.toEqual({
        ...mockCourse,
        id,
      });
      expect(service.findCourseById).toHaveBeenCalledWith(id);
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import * as mongoose from 'mongoose';
import { UpdateCourseDTO } from './dto/course-update.dto';
import { CreateCourseDto } from './dto/create-course.dto';
import { TagType } from './course-tag.enum';
import { courseLevelType } from './courseLevel.enum';
const mockCourse = {
  schedule: [],
  assignments: [],
  mentor: [],
  active: false,
  name: 'devesh K',
  originalPrice: 0,
  no_of_enrollments: 100,
  coupons: 0,
  video_num: 0,
  duration: '11.5 hours',
  start_date: '2020-02-05T06:35:22.000Z',
  end_date: '2020-02-05T06:35:22.000Z',
  sharable_link: '88900xyz.com',
  id: '60c5eafba5940a4964d5ea96',
  tags: TagType.WEB_DEV,
  courseDetails:
    'The course gives a hands on learning experience on Rest APIs and Javascript',
  courseLevel: courseLevelType.BEGINNER,
  courseThumbnail: 'https://codeforcause.org/courses',
  courseTrailerUrl: 'https://codeforcause.org/courseTrailer',
  crossPrice: 120,
  courseShortDescription: 'Short description--',
  courseLongDescription: 'Long description--',
  rating: 5,
  prerequisites: ['HTML', 'CSS'],
  skills: ['HTML', 'CSS'],
  whatYouWillLearn: ['HTML', 'CSS'],
  certificateUrl: 'https://codeforcause.org/certificate',
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
    addCourse: jest.fn().mockResolvedValue([mockCourse]),
    updateCourse: jest.fn().mockResolvedValue([mockCourse]),
    deleteCourse: jest.fn().mockResolvedValue([mockCourse]),
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

  // check if controller is defined
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Course', () => {
    // course creation
    it('should be created', async () => {
      await expect(controller.getAllCourses()).resolves.toEqual([mockCourse]);
    });

    // course found by id
    it('should be found by ID', async () => {
      const id = new mongoose.Schema.Types.ObjectId('22', 0, 'rtex');
      await expect(controller.getSelectedCourse(id)).resolves.toEqual({
        ...mockCourse,
        id,
      });
      expect(service.findCourseById).toHaveBeenCalledWith(id);
    });

    // retrieved value not equal as id if different/does not exist
    it('should not be equal to the returned value if  ID does not exist', async () => {
      const id = new mongoose.Schema.Types.ObjectId('18', 0, 'riep');
      const idFix = new mongoose.Schema.Types.ObjectId('22', 0, 'rtex');
      await expect(controller.getSelectedCourse(id)).resolves.not.toEqual({
        ...mockCourse,
        idFix,
      });
      expect(service.findCourseById).toHaveBeenCalledWith(id);
    });

    it('should be created', async () => {
      const dto: CreateCourseDto = {
        mentor: [],
        active: false,
        name: 'devesh K',
        originalPrice: 0,
        coupons: 0,
        video_num: 0,
        duration: '11.5 hours',
        sharable_link: '88900xyz.com',
        start_date: new Date(),
        end_date: new Date(),
        assignments: [],
        tags: [],
        courseDetails:
          'The course gives a hands on learning experience on Rest APIs and Javascript',
        courseLevel: courseLevelType.BEGINNER,
        courseThumbnail: 'https://codeforcause.org/courses',
        courseTrailerUrl: 'https://codeforcause.org/courseTrailer',
        crossPrice: 120,
        courseShortDescription: 'Short description--',
        courseLongDescription: 'Long description--',
        rating: 5,
        prerequisites: ['HTML', 'CSS'],
        skills: ['HTML', 'CSS'],
        whatYouWillLearn: ['HTML', 'CSS'],
        certificateUrl: 'https://codeforcause.org/certificate',
      };
      await expect(controller.addCourse(dto)).resolves.not.toBeNull();
      expect(service.addCourse).toHaveBeenCalledWith(dto);
    });

    // should be updated
    it('should be updated', async () => {
      const id = new mongoose.Schema.Types.ObjectId('22', 0, 'rtex');
      const dto: UpdateCourseDTO = {
        assignments: [],
        mentor: [],
        active: false,
        name: 'devesh K',
        originalPrice: 0,
        coupons: 0,
        video_num: 0,
        duration: '11.5 hours',
        sharable_link: '88900xyz.com',
        no_of_enrollments: 100,
        start_date: new Date(),
        end_date: new Date(),
        tags: [],
        courseDetails:
          'The course gives a hands on learning experience on Rest APIs and Javascript',
        courseLevel: courseLevelType.BEGINNER,
        courseThumbnail: 'https://codeforcause.org/courses',
        courseTrailerUrl: 'https://codeforcause.org/courseTrailer',
        crossPrice: 120,
        courseShortDescription: 'Short description--',
        courseLongDescription: 'Long description--',
        rating: 5,
        prerequisites: ['HTML', 'CSS'],
        skills: ['HTML', 'CSS'],
        whatYouWillLearn: ['HTML', 'CSS'],
        certificateUrl: 'https://codeforcause.org/certificate',
      };
      await expect(controller.updateCourse(id, dto)).resolves.toEqual({
        id,
        ...dto,
        schedule: [],
      });
      expect(service.editCourse).toHaveBeenCalledWith(id, dto);
    });

    // retrieved value not equal as id if different/does not exist
    it('should not be updated and be equal to the returned value if  ID does not exist', async () => {
      const id = new mongoose.Schema.Types.ObjectId('18', 0, 'riep');
      const idFix = new mongoose.Schema.Types.ObjectId('22', 0, 'rtex');
      const dto: UpdateCourseDTO = {
        assignments: [],
        mentor: [],
        active: false,
        name: 'devesh K',
        originalPrice: 0,
        coupons: 0,
        video_num: 0,
        duration: '11.5 hours',
        sharable_link: '88900xyz.com',
        no_of_enrollments: 100,
        start_date: new Date(),
        end_date: new Date(),
        tags: [],
        courseDetails:
          'The course gives a hands on learning experience on Rest APIs and Javascript',
        courseLevel: courseLevelType.BEGINNER,
        courseThumbnail: 'https://codeforcause.org/courses',
        courseTrailerUrl: 'https://codeforcause.org/courseTrailer',
        crossPrice: 120,
        courseShortDescription: 'Short description--',
        courseLongDescription: 'Long description--',
        rating: 5,
        prerequisites: ['HTML', 'CSS'],
        skills: ['HTML', 'CSS'],
        whatYouWillLearn: ['HTML', 'CSS'],
        certificateUrl: 'https://codeforcause.org/certificate',
      };
      await expect(controller.updateCourse(id, dto)).resolves.not.toEqual({
        ...mockCourse,
        idFix,
      });
      expect(service.editCourse).toHaveBeenCalledWith(id, dto);
    });

    // shpuld be deleted
    it('should be deleted', async () => {
      const id = new mongoose.Schema.Types.ObjectId('22', 0, 'rtex');
      await expect(controller.deleteCourse(id)).resolves.toEqual([
        {
          ...mockCourse,
        },
      ]);
      expect(service.deleteCourse).toHaveBeenCalledWith(id);
    });
  });

  // retrieved value not equal as id if different/does not exist
  it('should not be deleted and be equal to the returned value if  ID does not exist', async () => {
    const id = new mongoose.Schema.Types.ObjectId('18', 0, 'riep');
    const idFix = new mongoose.Schema.Types.ObjectId('22', 0, 'rtex');
    await expect(controller.deleteCourse(id)).resolves.not.toEqual({
      ...mockCourse,
      idFix,
    });
    expect(service.deleteCourse).toHaveBeenCalledWith(id);
  });
});

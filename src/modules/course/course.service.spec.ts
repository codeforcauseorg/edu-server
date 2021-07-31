import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CourseService } from './course.service';
import { createMock } from '@golevelup/nestjs-testing';
import { Model, Query } from 'mongoose';
import * as mongoose from 'mongoose';
import { Course, CourseDocument as CourseDoc } from './schema/course.schema';
// import { CourseDoc } from './interfaces/course-document.interface';
import { UpdateCourseDTO } from './dto/course-update.dto';
import { TagType } from './course-tag.enum';
import { courseLevelType } from './courseLevel.enum';

const mockCourse = (
  name = 'DSA with JS',
  originalPrice = 100,
  active = false,
  couponCode = 'CFC424',
  video_num = 0,
  duration = '11.5 hours',
  assignments = [],
  start_date = new Date('2020-02-05T06:35:22.000Z'),
  end_date = new Date('2020-02-05T06:35:22.000Z'),
  sharable_link = 'https://88900xyz.com',
  mentor = ['6079f573062890a5e2cad200'],
  tags = [TagType.WEB_DEV],
  courseDetails = 'The course gives a hands on learning experience on Rest APIs and Javascript',
  courseLevel = courseLevelType.BEGINNER,
  courseThumbnail = 'https://codeforcause.org/courses',
  courseTrailerUrl = 'https://codeforcause.org/courseTrailer',
  no_of_enrollments = 1000,
  student_num = 2,
  schedule = [],
  reviews = [],
  crossPrice = 120,
  courseShortDescription = 'Short description--',
  courseLongDescription = 'Long description--',
  rating = 5,
  prerequisites = [],
  skills = [],
  whatYouWillLearn = [],
  certificateUrl = 'https://codeforcause.org/certificate',
  lecture = [],
): Course => ({
  name,
  originalPrice,
  active,
  couponCode,
  video_num,
  duration,
  assignments,
  start_date,
  end_date,
  sharable_link,
  mentor,
  tags,
  courseDetails,
  courseLevel,
  courseThumbnail,
  courseTrailerUrl,
  no_of_enrollments,
  student_num,
  schedule,
  reviews,
  crossPrice,
  courseShortDescription,
  courseLongDescription,
  rating,
  prerequisites,
  skills,
  whatYouWillLearn,
  certificateUrl,
  lecture,
});

const mockCourseDoc = (mock?: Partial<Course>, _id?): Partial<CourseDoc> => ({
  name: mock?.name || 'DSA with JS',
  originalPrice: mock?.originalPrice || 100,
  active: mock?.active || false,
  couponCode: mock?.couponCode || 'CFC424',
  video_num: mock?.video_num || 0,
  duration: mock?.duration || '11.5 hours',
  assignments: mock?.assignments || [],
  start_date: mock?.start_date || new Date('2020-02-05T06:35:22.000Z'),
  end_date: mock?.end_date || new Date('2020-02-05T06:35:22.000Z'),
  sharable_link: mock?.sharable_link || 'https://88900xyz.com',
  mentor: mock?.mentor || [],
  tags: mock?.tags || [TagType.WEB_DEV],
  courseDetails:
    mock?.courseDetails ||
    'The course gives a hands on learning experience on Rest APIs and Javascript',
  courseLevel: mock?.courseLevel || courseLevelType.BEGINNER,
  courseThumbnail: mock?.courseThumbnail || 'https://codeforcause.org/courses',
  courseTrailerUrl:
    mock?.courseTrailerUrl || 'https://codeforcause.org/courseTrailer',
  _id: _id || '6079f573062890a5e2cad207',
  no_of_enrollments: mock?.no_of_enrollments || 1000,
  student_num: mock?.student_num || 2,
  schedule: mock?.schedule || [],
  reviews: mock?.reviews || [],
  crossPrice: mock?.crossPrice || 120,
  courseShortDescription: mock?.courseShortDescription || 'Short description--',
  courseLongDescription: mock?.courseLongDescription || 'Long description--',
  rating: mock?.rating || 5,
  prerequisites: mock?.prerequisites || [],
  skills: mock?.skills || [],
  whatYouWillLearn: mock?.whatYouWillLearn || [],
  certificateUrl:
    mock?.certificateUrl || 'https://codeforcause.org/certificate',
  lecture: mock?.lecture || [],
});

describe('CourseService', () => {
  let service: CourseService;
  let model: Model<CourseDoc>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourseService,
        {
          provide: getModelToken('Course'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockCourse),
            constructor: jest.fn().mockResolvedValue(mockCourse),
            find: jest.fn(),
            populate: jest.fn(),
            findOne: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            create: jest.fn(),
            remove: jest.fn(),
            exec: jest.fn(),
            findByIdAndUpdate: jest.fn(),
          },
        },
        {
          provide: getModelToken('Schedule'),
          useValue: {},
        },
        {
          provide: getModelToken('Review'),
          useValue: {},
        },
        {
          provide: getModelToken('Assignment'),
          useValue: {},
        },
        {
          provide: getModelToken('Lecture'),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<CourseService>(CourseService);
    model = module.get<Model<CourseDoc>>(getModelToken('Course'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  beforeEach(() => {
    jest.setTimeout(10000);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Testing courseservice after mock', () => {
    const _id = '60bca010d17d463dd09baf9b';
    const courseDocArray = [
      mockCourseDoc({ mentor: ['6079f573062890a5e2cad200'] }, _id),
    ];

    // Test for testing the service for returning all courses
    it('should return all courses', async () => {
      jest.spyOn(model, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(courseDocArray),
      } as any);
      const courses = await service.findAllCourses();
      const courseArray = [{ ...mockCourse(), _id }];
      expect(courses).toEqual(courseArray);
    });

    // Test for testing the service for finding a Course  by id
    it.skip('should getOne course by id', async () => {
      jest.spyOn(model, 'findById').mockReturnValueOnce(
        createMock<Query<CourseDoc, CourseDoc>>({
          exec: jest.fn().mockResolvedValueOnce(mockCourseDoc()),
        }),
      );
      const findMockCourse = mockCourse();
      const id = new mongoose.Schema.Types.ObjectId('22', 0, 'rtex');
      const foundCourse = await service.findCourseById(id);
      expect(foundCourse).toEqual(findMockCourse);
    });

    // Test for testing the service for updating a Course
    it('should update a Course successfully', async () => {
      jest.spyOn(model, 'findByIdAndUpdate').mockReturnValueOnce(
        createMock<Query<CourseDoc, CourseDoc>>({
          exec: jest.fn().mockResolvedValueOnce({
            name: 'DSA with JAVA',
            originalPrice: 100,
            active: false,
            couponCode: 'CFC424',
            video_num: 0,
            duration: '11.5 hours',
            assignments: [],
            start_date: '2020-02-05T06:35:22.000Z',
            end_date: '2020-02-05T06:35:22.000Z',
            sharable_link: 'https://java.com',
            mentor: [],
            tags: [TagType.WEB_DEV],
            courseDetails:
              'The course gives a hands on learning experience on Rest APIs and Javascript',
            courseLevel: courseLevelType.BEGINNER,
            courseThumbnail: 'https://codeforcause.org/courses',
            courseTrailerUrl: 'https://codeforcause.org/courseTrailer',
            no_of_enrollments: 1000,
            student_num: 2,
            schedule: [],
            reviews: [],
            _id: '6079f573062890a5e2cad207',
            crossPrice: 120,
            courseShortDescription: 'Short description--',
            courseLongDescription: 'Long description--',
            rating: 5,
            prerequisites: [],
            skills: [],
            whatYouWillLearn: [],
            certificateUrl: 'https://codeforcause.org/certificate',
            lecture: [],
          }),
        }),
      );
      const id = new mongoose.Schema.Types.ObjectId('22', 0, 'rtex');
      const updateCoursedto: UpdateCourseDTO = {
        name: 'DSA with JAVA',
        originalPrice: 100,
        active: false,
        couponCode: 'CFC424',
        video_num: 0,
        duration: '11.5 hours',
        start_date: new Date('2020-02-05T06:35:22.000Z'),
        end_date: new Date('2020-02-05T06:35:22.000Z'),
        sharable_link: 'https://java.com',
        mentor: [],
        tags: [TagType.WEB_DEV],
        courseDetails:
          'The course gives a hands on learning experience on Rest APIs and Javascript',
        courseLevel: courseLevelType.BEGINNER,
        courseThumbnail: 'https://codeforcause.org/courses',
        courseTrailerUrl: 'https://codeforcause.org/courseTrailer',
        no_of_enrollments: 1000,
        crossPrice: 120,
        courseShortDescription: 'Short description--',
        courseLongDescription: 'Long description--',
        rating: 5,
        prerequisites: [],
        skills: [],
        whatYouWillLearn: [],
        certificateUrl: 'https://codeforcause.org/certificate',
      };
      const updatedCourse = await service.editCourse(id, updateCoursedto);
      const _id = '6079f573062890a5e2cad207';
      const updatedCourseFinal = { ...mockCourse(), ...updatedCourse, _id };
      expect(updatedCourse).toEqual(updatedCourseFinal);
    });
  });
});

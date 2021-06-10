import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CourseService } from './course.service';

describe('CourseService', () => {
  let service: CourseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourseService,
        {
          provide: getModelToken('Course'),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<CourseService>(CourseService);
  });

  describe('Testing userService after mock', () => {
    it('testing get all courses method', () => {
      expect(typeof service.getAllCourses).not.toEqual(null);
    });
    it('testing get by id method', () => {
      expect(typeof service.findCourseById).not.toEqual(null);
    });
    it('testing get by id method', () => {
      expect(typeof service.deleteCourse).not.toEqual(null);
    });
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

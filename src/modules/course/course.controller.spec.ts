import { Test, TestingModule } from '@nestjs/testing';
import { Any } from 'typeorm';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';

describe('CourseController', () => {
  let controller: CourseController;
  let service: CourseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseController],
      providers: [CourseService],
    }).compile();

    controller = module.get<CourseController>(CourseController);
    service = module.get<CourseService>(CourseService);
  });

  describe('findAll checker', () => {
    it('should return an array of courses', async () => {
      const result = [];
      jest
        .spyOn(CourseService, getAllCourses())
        .mockImplementation(() => result);

      expect(await CourseController.getAllCourses()).toBe(result);
    });
  });
});

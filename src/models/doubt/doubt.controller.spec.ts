import { Test, TestingModule } from '@nestjs/testing';
import { DoubtController } from './doubt.controller';
import { DoubtService } from './doubt.service';

describe('DoubtController', () => {
  let controller: DoubtController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoubtController],
      providers: [
        {
          provide: DoubtService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<DoubtController>(DoubtController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

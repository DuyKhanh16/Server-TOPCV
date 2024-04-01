import { Test, TestingModule } from '@nestjs/testing';
import { UersService } from './uers.service';

describe('UersService', () => {
  let service: UersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UersService],
    }).compile();

    service = module.get<UersService>(UersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

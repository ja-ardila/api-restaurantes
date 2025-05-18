import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantsDishesService } from './restaurants-dishes.service';

describe('RestaurantsDishesService', () => {
  let service: RestaurantsDishesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestaurantsDishesService],
    }).compile();

    service = module.get<RestaurantsDishesService>(RestaurantsDishesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantsDishesController } from './restaurants-dishes.controller';

describe('RestaurantsDishesController', () => {
  let controller: RestaurantsDishesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestaurantsDishesController],
    }).compile();

    controller = module.get<RestaurantsDishesController>(RestaurantsDishesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

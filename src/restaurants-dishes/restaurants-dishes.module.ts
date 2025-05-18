import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantEntity } from '../entities/restaurant.entity';
import { DishEntity } from '../entities/dish.entity';
import { RestaurantsDishesService } from './restaurants-dishes.service';
import { RestaurantsDishesController } from './restaurants-dishes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RestaurantEntity, DishEntity])],
  controllers: [RestaurantsDishesController],
  providers: [RestaurantsDishesService],
})
export class RestaurantsDishesModule {}

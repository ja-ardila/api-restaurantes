/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { RestaurantsDishesService } from './restaurants-dishes.service';
import { DishEntity } from '../entities/dish.entity';

@Controller('restaurants/:restaurantId/dishes')
export class RestaurantsDishesController {
  constructor(private readonly rdService: RestaurantsDishesService) {}

  @Post()
  addDish(
    @Param('restaurantId', ParseIntPipe) restaurantId: number,
    @Body('dishId', ParseIntPipe) dishId: number,
  ): Promise<void> {
    return this.rdService.addDishToRestaurant(restaurantId, dishId);
  }

  @Get()
  findAll(
    @Param('restaurantId', ParseIntPipe) restaurantId: number,
  ): Promise<DishEntity[]> {
    return this.rdService.findDishesFromRestaurant(restaurantId);
  }

  @Get(':dishId')
  findOne(
    @Param('restaurantId', ParseIntPipe) restaurantId: number,
    @Param('dishId', ParseIntPipe) dishId: number,
  ): Promise<DishEntity> {
    return this.rdService.findDishFromRestaurant(restaurantId, dishId);
  }

  @Put()
  updateAll(
    @Param('restaurantId', ParseIntPipe) restaurantId: number,
    @Body('dishIds') dishIds: number[],
  ): Promise<DishEntity[]> {
    return this.rdService.updateDishesFromRestaurant(restaurantId, dishIds);
  }

  @Delete(':dishId')
  removeDish(
    @Param('restaurantId', ParseIntPipe) restaurantId: number,
    @Param('dishId', ParseIntPipe) dishId: number,
  ): Promise<void> {
    return this.rdService.deleteDishFromRestaurant(restaurantId, dishId);
  }
}
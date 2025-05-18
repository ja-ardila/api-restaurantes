/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RestaurantEntity } from '../entities/restaurant.entity';
import { DishEntity } from '../entities/dish.entity';

@Injectable()
export class RestaurantsDishesService {
  constructor(
    @InjectRepository(RestaurantEntity)
    private readonly restaurantRepo: Repository<RestaurantEntity>,
    @InjectRepository(DishEntity)
    private readonly dishRepo: Repository<DishEntity>,
  ){}

  private async findRestaurant(id: number): Promise<RestaurantEntity> {
    const restaurant = await this.restaurantRepo.findOne({ where: { id }, relations: ['dishes'] });
    if (!restaurant) throw new NotFoundException(`Restaurant ${id} not found`);
    return restaurant;
  }

  async addDishToRestaurant(restaurantId: number, dishId: number): Promise<void> {
    const restaurant = await this.findRestaurant(restaurantId);
    const dish = await this.dishRepo.findOneBy({ id: dishId });
    if (!dish) throw new NotFoundException(`Dish ${dishId} not found`);
    restaurant.dishes.push(dish);
    await this.restaurantRepo.save(restaurant);
  }

  async findDishesFromRestaurant(restaurantId: number): Promise<DishEntity[]> {
    const restaurant = await this.findRestaurant(restaurantId);
    return restaurant.dishes;
  }

  async findDishFromRestaurant(restaurantId: number, dishId: number): Promise<DishEntity> {
    const dishes = await this.findDishesFromRestaurant(restaurantId);
    const dish = dishes.find(d => d.id === dishId);
    if (!dish) throw new NotFoundException(`Dish ${dishId} not associated with restaurant ${restaurantId}`);
    return dish;
  }

  async updateDishesFromRestaurant(restaurantId: number, dishIds: number[]): Promise<DishEntity[]> {
    const restaurant = await this.findRestaurant(restaurantId);
    restaurant.dishes = await Promise.all(
      dishIds.map(async id => {
        const d = await this.dishRepo.findOneBy({ id });
        if (!d) throw new NotFoundException(`Dish ${id} not found`);
        return d;
      }),
    );
    await this.restaurantRepo.save(restaurant);
    return restaurant.dishes;
  }

  async deleteDishFromRestaurant(restaurantId: number, dishId: number): Promise<void> {
    const restaurant = await this.findRestaurant(restaurantId);
    restaurant.dishes = restaurant.dishes.filter(d => d.id !== dishId);
    await this.restaurantRepo.save(restaurant);
  }
}
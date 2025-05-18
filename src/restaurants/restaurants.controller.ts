/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from '../dto/create-restaurant.dto';
import { UpdateRestaurantDto } from '../dto/update-restaurant.dto';
import { RestaurantEntity } from '../entities/restaurant.entity';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Get()
  findAll(): Promise<RestaurantEntity[]> {
    return this.restaurantsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<RestaurantEntity> {
    return this.restaurantsService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateRestaurantDto): Promise<RestaurantEntity> {
    return this.restaurantsService.create(dto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRestaurantDto,
  ): Promise<RestaurantEntity> {
    return this.restaurantsService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.restaurantsService.delete(id);
  }
}
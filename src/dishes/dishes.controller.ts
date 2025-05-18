/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { DishesService } from './dishes.service';
import { CreateDishDto } from '../dto/create-dish.dto';
import { UpdateDishDto } from '../dto/update-dish.dto';
import { DishEntity } from '../entities/dish.entity';

@Controller('dishes')
export class DishesController {
  constructor(private readonly dishesService: DishesService) {}

  @Get()
  findAll(): Promise<DishEntity[]> {
    return this.dishesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<DishEntity> {
    return this.dishesService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateDishDto): Promise<DishEntity> {
    return this.dishesService.create(dto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDishDto,
  ): Promise<DishEntity> {
    return this.dishesService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.dishesService.delete(id);
  }
}

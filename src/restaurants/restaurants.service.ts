/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RestaurantEntity } from '../entities/restaurant.entity';
import { CreateRestaurantDto } from '../dto/create-restaurant.dto';
import { UpdateRestaurantDto } from '../dto/update-restaurant.dto';

@Injectable()
export class RestaurantsService {
  private readonly allowedCuisines = ['Italiana','Japonesa','Mexicana','Colombiana','India','Internacional'];

  constructor(
    @InjectRepository(RestaurantEntity)
    private readonly restaurantRepo: Repository<RestaurantEntity>,
  ){}

  async findAll(): Promise<RestaurantEntity[]> {
    return this.restaurantRepo.find({ relations: ['dishes'] });
  }

  async findOne(id: number): Promise<RestaurantEntity> {
    const restaurant = await this.restaurantRepo.findOne({ where: { id }, relations: ['dishes'] });
    if (!restaurant) throw new NotFoundException(`Restaurant ${id} not found`);
    return restaurant;
  }

  async create(dto: CreateRestaurantDto): Promise<RestaurantEntity> {
    if (!this.allowedCuisines.includes(dto.cuisine)) {
      throw new BadRequestException(`Invalid cuisine type. Allowed: ${this.allowedCuisines.join(', ')}`);
    }
    return this.restaurantRepo.save({ ...dto });
  }

  async update(id: number, dto: UpdateRestaurantDto): Promise<RestaurantEntity> {
    const restaurant = await this.findOne(id);
    if (dto.cuisine && !this.allowedCuisines.includes(dto.cuisine)) {
      throw new BadRequestException(`Invalid cuisine type. Allowed: ${this.allowedCuisines.join(', ')}`);
    }
    Object.assign(restaurant, dto);
    return this.restaurantRepo.save(restaurant);
  }

  async delete(id: number): Promise<void> {
    const result = await this.restaurantRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Restaurant ${id} not found`);
  }
}
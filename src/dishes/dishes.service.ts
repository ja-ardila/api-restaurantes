/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DishEntity } from '../entities/dish.entity';
import { CreateDishDto } from '../dto/create-dish.dto';
import { UpdateDishDto } from '../dto/update-dish.dto';

@Injectable()
export class DishesService {
  private readonly allowedCategories = ['entrada', 'plato fuerte', 'postre', 'bebida'];

  constructor(
    @InjectRepository(DishEntity)
    private readonly dishRepo: Repository<DishEntity>,
  ){}

  async findAll(): Promise<DishEntity[]> {
    return this.dishRepo.find({ relations: ['restaurants'] });
  }

  async findOne(id: number): Promise<DishEntity> {
    const dish = await this.dishRepo.findOne({ where: { id }, relations: ['restaurants'] });
    if (!dish) throw new NotFoundException(`Dish ${id} not found`);
    return dish;
  }

  async create(dto: CreateDishDto): Promise<DishEntity> {
    if (dto.price <= 0) throw new BadRequestException('Price must be positive');
    if (!this.allowedCategories.includes(dto.category)) {
      throw new BadRequestException(`Invalid category. Allowed: ${this.allowedCategories.join(', ')}`);
    }
    return this.dishRepo.save({ ...dto });
  }

  async update(id: number, dto: UpdateDishDto): Promise<DishEntity> {
    const dish = await this.findOne(id);
    if (dto.price !== undefined && dto.price <= 0) {
      throw new BadRequestException('Price must be positive');
    }
    if (dto.category && !this.allowedCategories.includes(dto.category)) {
      throw new BadRequestException(`Invalid category. Allowed: ${this.allowedCategories.join(', ')}`);
    }
    Object.assign(dish, dto);
    return this.dishRepo.save(dish);
  }

  async delete(id: number): Promise<void> {
    const result = await this.dishRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Dish ${id} not found`);
  }
}
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DishEntity } from '../entities/dish.entity';
import { DishesService } from './dishes.service';
import { DishesController } from './dishes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DishEntity])],
  controllers: [DishesController],
  providers: [DishesService],
  exports: [DishesService],
})
export class DishesModule {}

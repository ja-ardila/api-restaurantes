/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsPositive } from 'class-validator';

enum DishCategory {
  Entrada = 'entrada',
  PlatoFuerte = 'plato fuerte',
  Postre = 'postre',
  Bebida = 'bebida',
}

export class CreateDishDto {
  @ApiProperty({ example: 'Ensalada Caprese', description: 'Nombre del plato' })
  @IsString()
  name!: string;

  @ApiProperty({ example: 'Tomate, albahaca, mozzarella', description: 'Descripción del plato' })
  @IsString()
  description!: string;

  @ApiProperty({ example: 12.5, description: 'Precio del plato', minimum: 0.01 })
  @IsPositive()
  price!: number;

  @ApiProperty({ enum: DishCategory, description: 'Categoría del plato' })
  @IsEnum(DishCategory)
  category!: DishCategory;
}

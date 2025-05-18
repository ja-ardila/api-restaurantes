/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, IsEnum } from 'class-validator';

enum CuisineType {
  Italiana = 'Italiana',
  Japonesa = 'Japonesa',
  Mexicana = 'Mexicana',
  Colombiana = 'Colombiana',
  India = 'India',
  Internacional = 'Internacional',
}

export class CreateRestaurantDto {
  @ApiProperty({ example: 'La Pizzeria', description: 'Nombre del restaurante' })
  @IsString()
  name!: string;

  @ApiProperty({ example: 'Calle 123', description: 'Dirección del restaurante' })
  @IsString()
  address!: string;

  @ApiProperty({ enum: CuisineType, description: 'Tipo de cocina' })
  @IsEnum(CuisineType)
  cuisine!: CuisineType;

  @ApiProperty({ example: 'https://lapizzeria.com', description: 'Sitio web' })
  @IsUrl()
  website!: string;
}
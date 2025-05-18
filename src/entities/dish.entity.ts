/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { RestaurantEntity } from './restaurant.entity';

@Entity('dishes')
export class DishEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal')
  price: number;

  @Column({ type: 'enum', enum: ['entrada','plato fuerte','postre','bebida'] })
  category: 'entrada' | 'plato fuerte' | 'postre' | 'bebida';

  @ManyToMany(() => RestaurantEntity, restaurant => restaurant.dishes)
  restaurants: RestaurantEntity[];
}
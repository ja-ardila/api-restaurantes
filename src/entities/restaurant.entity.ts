/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { DishEntity } from './dish.entity';

@Entity('restaurants')
export class RestaurantEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column({ type: 'enum', enum: ['Italiana','Japonesa','Mexicana','Colombiana','India','Internacional'] })
  cuisine: 'Italiana' | 'Japonesa' | 'Mexicana' | 'Colombiana' | 'India' | 'Internacional';

  @Column()
  website: string;

  @ManyToMany(() => DishEntity, dish => dish.restaurants)
  @JoinTable({
    name: 'restaurant_dishes',
    joinColumn: { name: 'restaurant_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'dish_id', referencedColumnName: 'id' },
  })
  dishes: DishEntity[];
}
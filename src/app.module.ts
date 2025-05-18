import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { DishesModule } from './dishes/dishes.module';
import { RestaurantsDishesModule } from './restaurants-dishes/restaurants-dishes.module';
import { RestaurantEntity } from './entities/restaurant.entity';
import { DishEntity } from './entities/dish.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'restaurant_db',
      entities: [RestaurantEntity, DishEntity],
      synchronize: true,
    }),
    RestaurantsModule,
    DishesModule,
    RestaurantsDishesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

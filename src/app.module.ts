import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { DishesModule } from './dishes/dishes.module';
import { RestaurantsDishesService } from './restaurants-dishes/restaurants-dishes.service';
import { RestaurantsDishesController } from './restaurants-dishes/restaurants-dishes.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'tu_usuario',
      password: 'tu_contraseña',
      database: 'restaurant_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    RestaurantsModule,
    DishesModule,
  ],
  controllers: [AppController, RestaurantsDishesController],
  providers: [AppService, RestaurantsDishesService],
})
export class AppModule {}

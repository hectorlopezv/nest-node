import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { CarsModule } from 'src/cars/cars.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonSchema } from 'src/pokemon/entities/pokemon.entity';
import { CommonModule } from 'src/common/common.modue';

@Module({
  imports: [
    CarsModule,
    CommonModule,
    MongooseModule.forFeature([{ name: 'Pokemon', schema: PokemonSchema }]),
  ],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}

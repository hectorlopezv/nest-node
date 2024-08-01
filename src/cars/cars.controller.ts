import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dtos/create-cart.dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}
  @Get(':id')
  getCardById(@Param('id', ParseUUIDPipe) id: string) {
    return this.carsService.getCardById(id);
  }
  @Get()
  getAllCars() {
    return this.carsService.getAllCars();
  }

  @Patch(':id')
  updateCar(@Param('id', ParseUUIDPipe) id: string) {
    return this.carsService.updateCar(id);
  }
  @Delete(':id')
  deleteCar(@Param('id', ParseUUIDPipe) id: number) {
    return `Car with id ${id} has been deleted`;
  }

  @Post()
  
  createCar(@Body() createCarDto: CreateCarDto) {
    return this.carsService.createCart(createCarDto);
  }
}

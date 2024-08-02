import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateCarDto } from './dtos/create-cart.dto';
import { Car } from './intefaces/car.interface';
@Injectable()
export class CarsService {
  private cars = [
    {
      id: uuid(),
      brand: 'Toyota',
      model: 'Corolla',
    },
    { id: uuid(), brand: 'Ford', model: 'Camry' },
    { id: uuid(), brand: 'Honda', model: 'Corolla' },
  ];

  fillCarsWithSeedData(data: Car[]) {
    this.cars = data;
  }
  getCardById(id: string) {
    const car = this.cars.find((car) => car.id === id);
    if (!car) {
      throw new NotFoundException('Car not found');
    }
  }
  deleteCar(id: string) {
    const car = this.cars.find((car) => car.id === id);
    if (!car) {
      throw new NotFoundException('Car not found');
    }
    return `Car with id ${id} has been deleted`;
  }

  updateCar(id: string) {
    const car = this.cars.find((car) => car.id === id);
    if (!car) {
      throw new NotFoundException('Car not found');
    }
    const newCar = { ...car, brand: 'New Brand' };
    return newCar;
  }
  createCart(body: CreateCarDto) {
    const newCar = { id: uuid(), ...body };
    this.cars.push(newCar);
    return newCar;
  }
  getAllCars() {
    return this.cars;
  }
}

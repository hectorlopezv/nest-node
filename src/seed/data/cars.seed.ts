import { Brand } from 'src/brands/entities/brand.entity';
import { Car } from 'src/cars/intefaces/car.interface';
import { v4 as uuid } from 'uuid';

export const CARS_SEED: Car[] = [
  {
    id: uuid(),
    brand: 'Toyota',
    model: 'Corolla',
  },
  {
    id: uuid(),
    brand: 'Toyota',
    model: 'Camry',
  },
  {
    id: uuid(),
    brand: 'Toyota',
    model: 'RAV4',
  },
];

export const BRANDS_SEED: Brand[] = [
  {
    id: uuid(),
    name: 'Toyota',
    createdAt: new Date().getTime().toString(),
  },
  {
    id: uuid(),
    name: 'Toyota',
    createdAt: new Date().getTime().toString(),
  },
];

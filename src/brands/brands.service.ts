import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { v4 as udid } from 'uuid';
@Injectable()
export class BrandsService {
  private brands: Brand[] = [
    {
      id: udid(),
      name: 'Apple',
      createdAt: new Date().getTime().toString(),
    },
    {
      id: udid(),
      name: 'Tesla',
      createdAt: new Date().getTime().toString(),
    },
    {
      id: udid(),
      name: 'Toyota',
      createdAt: new Date().getTime().toString(),
    },
  ];
  create(createBrandDto: CreateBrandDto) {
    const { name } = createBrandDto;
    const newBrand = {
      id: udid(),
      name,
      createdAt: new Date().getTime().toString(),
    };
    this.brands.push(newBrand);
    return newBrand;
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find((brand) => brand.id === id);
    if (!brand) {
      throw new NotFoundException('Brand not found');
    }
    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    const { name } = updateBrandDto;
    if (!name) {
      throw new NotFoundException('Brand not found');
    }
    const brand = this.brands.find((brand) => brand.id === id);
    if (!brand) {
      throw new NotFoundException('Brand not found');
    }
    brand.name = name;
    brand.updatedAt = new Date().getTime().toString();
    return brand;
  }

  remove(id: string) {
    const brand = this.findOne(id);
    if (!brand) {
      throw new NotFoundException('Brand not found');
    }
    this.brands = this.brands.filter((brand) => brand.id !== id);
    return this.brands;
  }
}

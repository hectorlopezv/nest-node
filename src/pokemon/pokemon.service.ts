import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  private handleExceptions(error: any) {
    if (error?.code === 11000) {
      throw new BadRequestException('Pokemon already exists');
    }
    throw new InternalServerErrorException(`Something went wrong`);
  }
  create(createPokemonDto: CreatePokemonDto) {
    try {
      const createdPokemon = new this.pokemonModel(createPokemonDto);
      return createdPokemon.save();
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit, offset } = paginationDto;

    return this.pokemonModel
      .find()
      .limit(limit)
      .skip(offset)
      .sort({ no: 1 })
      .select('-__v');
  }

  findOne(id: string) {
    if (isValidObjectId(id)) {
      throw new NotFoundException(`Pokemon with id ${id}`);
    }
    const pokemon = this.pokemonModel.findById(id);
    if (!pokemon) {
      throw new NotFoundException(`Pokemon with id ${id} not found`);
    }
    return pokemon;
  }

  update(id: string, updatePokemonDto: UpdatePokemonDto) {
    if (isValidObjectId(id)) {
      throw new NotFoundException(`Pokemon with id ${id}`);
    }
    const updatedPokemon = this.pokemonModel.findByIdAndUpdate(
      id,
      updatePokemonDto,
      { new: true },
    );
    return updatedPokemon;
  }

  remove(id: string) {
    if (isValidObjectId(id)) {
      throw new NotFoundException(`Pokemon with id ${id}`);
    }
    const deletedPokemon = this.pokemonModel.findByIdAndDelete(id);

    if (!deletedPokemon) {
      throw new NotFoundException(`Pokemon with id ${id} not found`);
    }
    return deletedPokemon;
  }
}

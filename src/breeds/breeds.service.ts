import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
import { Breed } from './entities/breed.entity';

@Injectable()
export class BreedsService {

  constructor(
    @InjectRepository(Breed)
    private readonly _breedRepository: Repository<Breed>
  ) {}


  async create(createBreedDto: CreateBreedDto) {
    const newBreed = this._breedRepository.create(createBreedDto);
    return await this._breedRepository.save(newBreed);
  }

  async findAll() {
    return await this._breedRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} breed`;
  }

  update(id: number, updateBreedDto: UpdateBreedDto) {
    return `This action updates a #${id} breed`;
  }

  remove(id: number) {
    return `This action removes a #${id} breed`;
  }
}

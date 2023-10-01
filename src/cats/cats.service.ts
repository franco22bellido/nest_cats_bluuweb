import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Breed } from 'src/breeds/entities/breed.entity';
import { Repository } from 'typeorm';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';

@Injectable()
export class CatsService {

  constructor(
    @InjectRepository(Cat)
    private readonly _catRepository: Repository<Cat>,
    @InjectRepository(Breed)
    private readonly _breedRepository: Repository<Breed>
  ){}

  async create(createCatDto: CreateCatDto) {
    const breed = await this._breedRepository.findOne({where: {name: createCatDto.breed}});

    if(!breed){
      throw new BadRequestException("Breed not found");
    }
    
    return await this._catRepository.save({
      ...createCatDto,
      breed
    });


  }

  async findAll() {
    return await this ._catRepository.find();
  }

  async findOne(id: number) {
    return await this._catRepository.findOne({where: {id}});
  }

  async update(id: number, updateCatDto: UpdateCatDto) {
    return await this._catRepository.update(id, updateCatDto);
  }

  async remove(id: number) {
    return await this._catRepository.softDelete({ id });
  }
 
}
import { Injectable } from '@nestjs/common';
import { BadRequestException, UnauthorizedException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Breed } from 'src/breeds/entities/breed.entity';
import { Role } from 'src/common/enum/role.enum';
import { IUserActive } from 'src/common/interfaces/user-active.interface';
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

  async create(createCatDto: CreateCatDto, email: string) {
    const breed = await this.validateBreed(createCatDto.breed);

    return await this._catRepository.save({
      ...createCatDto,
      breed,
      userEmail: email
    });


  }

  async findAll(user: IUserActive) {
    
    return await this ._catRepository.find({where: {userEmail: user.email}});
    
  }

  async findOne(id: number, user: IUserActive) {
    const cat = await this._catRepository.findOne({where: {id}});

    if(!cat) {
      throw new BadRequestException('Cat not found');
    }
    this.validateOwnerShip(cat, user);
    return cat;
  }

  async update(id: number, updateCatDto: UpdateCatDto, user: IUserActive) {
    await this.findOne(id , user);
    
    return await this._catRepository.update(id ,{
    age: updateCatDto.age,
    name: updateCatDto.name,
    breed: updateCatDto.breed ? await this.validateBreed(updateCatDto.breed) : undefined,
    userEmail: user.email
    });
    
  }

  async remove(id: number, user: IUserActive) {
    const cat = await this.findOne(id, user);
    return await this._catRepository.softDelete({ id });
  }
 








  private validateOwnerShip(cat: Cat, user: IUserActive){
    //si el usuario no es administrador y el email no es suyo entonces no se lo muestra.
    //o sea, si una condición es true entonces no se sigue.
    if(user.role !== Role.ADMIN && cat.userEmail !== user.email){
      throw new UnauthorizedException();
    }
  }

  private async validateBreed(breed: string){
    const breedFound = await this._breedRepository.findOne({where: {name: breed}});

    if(!breedFound){
      throw new BadRequestException("Breed not found");
    }
    return breedFound;
  }
}
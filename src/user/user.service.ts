import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,
  ){}

  async create(createUserDto: CreateUserDto) {
    return await this._userRepository.save(createUserDto);
  }

  //esto se podria enviar a un repository
  findOneByEmail(email: string){
    return this._userRepository.findOne({where: {email}});
  }
  findOneByEmailWithPassword(email: string) {
    return this._userRepository.findOne({where: {email},
          select: {
            id: true,
            name: true,
            role: true,
            password: true, email: true}});
  }

  findAll() {
    return this._userRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import {Auth} from '../auth/decorators/auth.decorator'
import { Role } from 'src/common/enum/role.enum';
import { ActiveUser } from 'src/common/decorators/active-user-decorator';
import { IUserActive } from 'src/common/interfaces/user-active.interface';

@Auth(Role.USER)
@Controller('cats')            
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto,
        @ActiveUser() user: IUserActive) {

    return this.catsService.create(createCatDto, user.email);
  }

  @Get()
  findAll(@ActiveUser() user: IUserActive) {
    return this.catsService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: number,
  @ActiveUser() user: IUserActive) {
    return this.catsService.findOne(id,user);
  }

  @Patch(':id')
  update(@Param('id') id: number,
  @ActiveUser() user: IUserActive
  , @Body() updateCatDto: UpdateCatDto) {
    return this.catsService.update(id, updateCatDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: number,
  @ActiveUser() user: IUserActive) {
    return this.catsService.remove(id,user);
  }
}

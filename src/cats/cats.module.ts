import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { Cat } from './entities/cat.entity';
import { Breed } from 'src/breeds/entities/breed.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Cat,Breed]),JwtModule],
  controllers: [CatsController],
  providers: [CatsService]
})
export class CatsModule {}

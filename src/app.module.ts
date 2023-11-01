import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CatsModule } from './cats/cats.module';
import { BreedsModule } from './breeds/breeds.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    CatsModule
  ,TypeOrmModule.forRoot({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: parseInt( process.env.POSTGRES_PORT),
    username:  process.env.POSTGRES_USERNAME,
    password:  process.env.POSTGRES_PASSWORD,
    database:  process.env.POSTGRES_DATABASE,
    autoLoadEntities: true,
    synchronize: true,
    ssl: process.env.POSTGRES_SSL === "true",
    extra: {
      ssl: process.env.POSTGRES_SSL === "true"
      ? {
        rejectUnauthorized: false
      }: null
    }
  }), BreedsModule, UserModule, AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

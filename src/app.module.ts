import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CatsModule } from './cats/cats.module';
import { BreedsModule } from './breeds/breeds.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [CatsModule
  ,TypeOrmModule.forRoot({
    type: "mysql",
    host: "localhost",
    port: 3307,
    username: "user_crud",
    password: "root",
    database: "db_crud",
    autoLoadEntities: true,
    synchronize: true
  }), BreedsModule, UserModule, AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

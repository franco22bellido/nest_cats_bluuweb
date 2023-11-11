import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt/dist';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {jwtConstants} from './constants/jwt.constants'

@Module({
  imports: [UserModule,
    JwtModule.registerAsync(
      {
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          secret: configService.get<string>('JWT_SECRET'),
          global: true,
          signOptions: {
            expiresIn: "2h"
          }
        }),
        inject: [ConfigService]
      }

      
    )
      // , JwtModule.register({
      //   global: true,
      //   secret: jwtConstants.secret,
      //   signOptions: {expiresIn: '60m'}
      // })
    ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [JwtModule]
})
export class AuthModule {}

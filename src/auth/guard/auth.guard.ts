import { CanActivate, 
         ExecutionContext,
         Injectable,
         UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import {JwtService} from '@nestjs/jwt'
import { jwtConstants } from '../constants/jwt.constants';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private readonly _jwtService: JwtService,
    
  ){}

  async canActivate(context: ExecutionContext):Promise<boolean> {
    //obtener request    
    const request = context.switchToHttp().getRequest();
    //obtener token del request
    const token = this.extractTokenFromHeaeder(request);
    if(!token){
      throw new UnauthorizedException("no token provide");
    }
    try {
      const payload = await this._jwtService.verifyAsync(token);
      request.user = payload;
    } catch (error) {
      throw new UnauthorizedException("invalid token");
    }
    return true;
  }


  
  private extractTokenFromHeaeder(request:Request): string | undefined{
    const [type,token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token: undefined;
  }
}
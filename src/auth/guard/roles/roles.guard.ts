import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import {Reflector} from '@nestjs/core'
import { ROLES_KEY } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/common/enum/role.enum';
import { RequestUser } from 'src/auth/request.user';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector){}
  canActivate(context: ExecutionContext): boolean{
    
    //obtener los metadatos
    const role: string = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    const request: RequestUser = context.switchToHttp().getRequest();

    if(request.user?.role == Role.ADMIN){
      return true;
    }

    return role === request.user.role;
    

  }
}
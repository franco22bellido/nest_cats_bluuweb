import {SetMetadata} from '@nestjs/common'
import { Role } from '../../common/enum/role.enum';

//esta archivo setea la metadata en controlador para ver que roles
//juegan en un endpoint
export const ROLES_KEY = 'roles';

export const Roles = (role: Role)=> SetMetadata(ROLES_KEY, role);


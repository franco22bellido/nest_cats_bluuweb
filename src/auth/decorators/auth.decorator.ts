import { Role } from "../../common/enum/role.enum";
import { applyDecorators } from "@nestjs/common/decorators/core/apply-decorators";
import { Roles } from "./roles.decorator";
import { UseGuards } from "@nestjs/common/decorators/core/use-guards.decorator";
import { AuthGuard } from "../guard/auth.guard";
import { RolesGuard } from "../guard/roles/roles.guard";


//esto es una combinación de decoradores para autenticar rapido
export function Auth(role: Role){
    return applyDecorators(
        Roles(role)// 1: aplica el rol que usaremos en los metadatos
        ,
        UseGuards(AuthGuard, RolesGuard)//2: verifica si el token es valido
                                        //3: verifica si ese token contiene roles y los compara
                                        //con lo que se guardo en la metadata
    );
}
import { Body, Controller, Post,Get,Request, Req} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from './guard/auth.guard';
import { AuthService } from './auth.service';
import { Roles } from './decorators/roles.decorator';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Role } from '../common/enum/role.enum';
import { RequestUser } from './request.user';
import { Auth } from './decorators/auth.decorator';
import { ActiveUser } from 'src/common/decorators/active-user-decorator';
import { IUserActive } from 'src/common/interfaces/user-active.interface';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly _authService: AuthService
    ){}
    
    @Post('register')
    register(
        @Body() registerDto: RegisterDto
    ){
        return this._authService.register(registerDto);
    }

    @Post('login')
    login(@Body() loginDto: LoginDto){
        return this._authService.login(loginDto);
    }

    @Get("profile")
    @Auth(Role.USER)//1:  usar la combinación de decoradores y le decimos que rol va a ser admitido
    proflie(
        @ActiveUser() user: IUserActive // extraer el usuario que se guardo en el request
    ) {
        return this._authService.profile(user);
        
    }

}

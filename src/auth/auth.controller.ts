import { Body, Controller, Post,Get,Request} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RequestUser } from './request.user';

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
    @UseGuards(AuthGuard)
    proflie(
        @Request() req: RequestUser
    ) {
        return req.user;
        
    }

}

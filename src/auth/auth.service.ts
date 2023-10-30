import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly _userService: UserService,
        private readonly jwtService: JwtService
    ){}
    
    async register(registerDto: RegisterDto){
        const {email, name, password} = registerDto;
        const user = await this._userService.findOneByEmail(email);

        if(user){
            throw new ConflictException("Email already exist");
        }

        const passwordHashed = await bcryptjs.hash(password, 10);

        return await this._userService.create({email, name, password: passwordHashed});
    }

    async login(loginDto: LoginDto){
        const {email, password} =  loginDto;

        const user = await this._userService.findOneByEmailWithPassword(email);

        if(!user){
            throw new UnauthorizedException("user or password is wrong");
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if(!isPasswordValid){
            throw new UnauthorizedException("user or password is wrong");
        }
        const payload = {email, role: user.role}
        const token = await this.jwtService.signAsync(payload);

        return  { 
            token,
            email,
            password: user.password
        }
    }

    async profile({email, role}: {email: string, role: string}){
        return await this._userService.findOneByEmail(email);

    }
}
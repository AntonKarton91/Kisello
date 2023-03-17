import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {UserService} from "../user/user.service";
import * as bcrypt from "bcrypt"
import {CreateUserDto} from "../user/dto/createUser.dto";
import {TokenService} from "../token/token.service";
import {Request, Response} from "express";


@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private tokenService: TokenService
    ) {}

    async login(res: Response, dto: CreateUserDto) {
        const user = await this.validateUser(dto)
        return await this.tokenService.generateToken(user)
        // await this.tokenService.saveToken(user, token)
        // res.cookie('accessToken', token, {maxAge: 30 * 60 * 60 * 1000, httpOnly: true})
        // return token
    }

    async  register(res: Response, dto: CreateUserDto) {
        const candidate = await this.userService.getUserByEmail(dto.email)
        if (candidate) {
            throw new HttpException("Пользователь с таким email уже существует", HttpStatus.BAD_REQUEST)
        }
        const passwordHash = await bcrypt.hash(dto.password, 5)
        const user = await this.userService.createUser({...dto, password: passwordHash})
        const accessToken = await this.tokenService.generateToken(user)
        return {
            id: user._id,
            email: user.email,
            password: user.password,
            accessToken
        }

    }

    async logout(refreshToken) {
        const token = await this.tokenService.deleteToken(refreshToken)
        return token
    }

    // async refresh(req: Request, res: Response) {
    //     const { refreshToken } = req.cookies;
    //
    //     const tokens = await this.tokenService.generateToken(user)
    //     await this.tokenService.saveToken(user, tokens.refreshToken)
    //     res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 60 * 60 * 1000, httpOnly: true})
    //     return {
    //         ...tokens
    //     }
    // }

    private async validateUser(dto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(dto.email)

        const passEquals = await bcrypt.compare(dto.password, user.password)
        if (user && passEquals) {
            return user._id
        }
        throw new UnauthorizedException({message: "Проверьте имя пользователя и пароль"})
    }
}

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
        const accessToken = await this.tokenService.generateToken(user)
        return {
            id: user._id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            password: user.password,
            avatar: user.avatar,
            phoneNumber: user.phoneNumber,
            boards: user.boards,
            position: user.position,
            accessToken
        }
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
            name: user.name,
            surname: user.surname,
            email: user.email,
            password: user.password,
            avatar: user.avatar,
            phoneNumber: user.phoneNumber,
            boards: user.boards,
            position: user.position,
            accessToken
        }
    }

    async getUserByToken(res: Response, token: { token: string }) {
        const { email } = await this.tokenService.verifyToken(token.token)
        const user = await this.userService.getUserByEmail(email)
        if (user) {
            return {
                id: user.id,
                name: user.name,
                surname: user.surname,
                email: user.email,
                avatar: user.avatar,
                phoneNumber: user.phoneNumber,
                boards: user.boards,
                position: user.position
            }
        }
    }

    private async validateUser(dto: Partial<CreateUserDto>){
        const user = await this.userService.getUserByEmail(dto.email)
        if (user) {
            const passEquals = await bcrypt.compare(dto.password, user.password)
            if (passEquals) {
                return user
            }
        }
        throw new UnauthorizedException({message: "Проверьте имя пользователя и пароль"})
    }
}

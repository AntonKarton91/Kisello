"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const bcrypt = require("bcrypt");
const token_service_1 = require("../token/token.service");
let AuthService = class AuthService {
    constructor(userService, tokenService) {
        this.userService = userService;
        this.tokenService = tokenService;
    }
    async login(res, dto) {
        const user = await this.validateUser(dto);
        const accessToken = await this.tokenService.generateToken(user);
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
        };
    }
    async register(res, dto) {
        const candidate = await this.userService.getUserByEmail(dto.email);
        if (candidate) {
            throw new common_1.HttpException("Пользователь с таким email уже существует", common_1.HttpStatus.BAD_REQUEST);
        }
        const passwordHash = await bcrypt.hash(dto.password, 5);
        const user = await this.userService.createUser(Object.assign(Object.assign({}, dto), { password: passwordHash }));
        const accessToken = await this.tokenService.generateToken(user);
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
        };
    }
    async getUserByToken(res, token) {
        const { email } = await this.tokenService.verifyToken(token.token);
        const user = await this.userService.getUserByEmail(email);
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
            };
        }
    }
    async validateUser(dto) {
        const user = await this.userService.getUserByEmail(dto.email);
        if (user) {
            const passEquals = await bcrypt.compare(dto.password, user.password);
            if (passEquals) {
                return user;
            }
        }
        throw new common_1.UnauthorizedException({ message: "Проверьте имя пользователя и пароль" });
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        token_service_1.TokenService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map
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
        return await this.tokenService.generateToken(user);
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
            email: user.email,
            password: user.password,
            accessToken
        };
    }
    async logout(refreshToken) {
        const token = await this.tokenService.deleteToken(refreshToken);
        return token;
    }
    async validateUser(dto) {
        const user = await this.userService.getUserByEmail(dto.email);
        const passEquals = await bcrypt.compare(dto.password, user.password);
        if (user && passEquals) {
            return user._id;
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
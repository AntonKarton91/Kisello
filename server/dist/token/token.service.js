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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../user/schemas/user.schema");
const mongoose_2 = require("mongoose");
const token_schema_1 = require("./token.schema");
let TokenService = class TokenService {
    constructor(tokenModel, jwtService) {
        this.tokenModel = tokenModel;
        this.jwtService = jwtService;
    }
    async generateToken(user) {
        const payload = {
            email: user.userEmail,
            password: user.userPassword,
            role: user_schema_1.UserRoleType.WORKER,
        };
        const accessToken = this.jwtService.sign(payload, { expiresIn: '30m' });
        return accessToken;
    }
    async saveToken(userId, refreshToken) {
        const tokenData = await this.tokenModel.findOne({ userId });
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            tokenData.save();
            return tokenData;
        }
        const token = await this.tokenModel.create({
            userId: userId,
            refreshToken,
        });
        return token;
    }
    async deleteToken(refreshToken) {
        const token = await this.tokenModel.findOneAndDelete({ refreshToken });
        return token;
    }
    async refreshToken(refreshToken) {
        const token = await this.tokenModel.findOneAndUpdate({ refreshToken }, { refreshToken });
        return token;
    }
};
TokenService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(token_schema_1.Token.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], TokenService);
exports.TokenService = TokenService;
//# sourceMappingURL=token.service.js.map
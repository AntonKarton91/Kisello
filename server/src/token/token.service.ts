import {
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument, UserRoleType } from '../user/schemas/user.schema';
import { Model } from 'mongoose';
import { Token, TokenDocument } from './token.schema';

@Injectable()
export class TokenService {
  constructor(
      @InjectModel(Token.name) private tokenModel: Model<TokenDocument>,
      private jwtService: JwtService,
  ) {
  }

  async generateToken(user) {
    const payload = {
      email: user.userEmail,
      password: user.userPassword,
      role: UserRoleType.WORKER,
    };
    const accessToken = this.jwtService.sign(payload, {expiresIn: '30m'});
    return accessToken;
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await this.tokenModel.findOne({userId});
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      tokenData.save();
      return tokenData
    }
    const token = await this.tokenModel.create({
      userId: userId,
      refreshToken,
    });
    return token;
  }

  async deleteToken(refreshToken) {
    const token = await this.tokenModel.findOneAndDelete({refreshToken});
    return token
  }

  async refreshToken(refreshToken) {
    const token = await this.tokenModel.findOneAndUpdate({refreshToken}, {refreshToken});
    return token
  }
}
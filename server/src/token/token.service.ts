import {HttpException, HttpStatus, Injectable,} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';

@Injectable()
export class TokenService {
  constructor(
      private jwtService: JwtService,
  ) {}

  async generateToken(user) {
    const payload = {
      email: user.email,
      password: user.password,
    };
    return  this.jwtService.sign(payload);
  }

  async verifyToken(token: string) {
    try {
      return this.jwtService.verify(token)
    } catch (e) {
      if (e instanceof Error) {
        throw new HttpException("Неверный токен", HttpStatus.BAD_REQUEST)
      }
    }
  }
}
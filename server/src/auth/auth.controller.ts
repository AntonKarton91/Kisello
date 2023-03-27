import {
  Body,
  Controller, HttpStatus,
  Post,
  Req,
  Res,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../user/dto/createUser.dto";
import { Request, Response } from "express";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Post("/register")
  // @UsePipes(new ValidationPipe())
  async register(
    @Body() dto: CreateUserDto,
    @Res({ passthrough: true }) response: Response
  ) {
    return await this.authService.register(response, dto);
  }

  @Post("/login")
  async login(
    @Body() dto: CreateUserDto,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.authService.login(response, dto);
  }

  @Post("/getbytoken")
  async getByToken(
    @Body() token: { token: string },
    @Res({ passthrough: true }) response: Response
  ) {
    return await this.authService.getUserByToken(response, token);
  }
}



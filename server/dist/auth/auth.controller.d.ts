import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { Request, Response } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(dto: CreateUserDto, response: Response): Promise<{
        id: import("mongoose").Types.ObjectId;
        email: string;
        password: string;
        accessToken: string;
    }>;
    login(dto: CreateUserDto, response: Response): Promise<string>;
    logout(response: Response, request: Request): Promise<{
        statusCode: number;
    }>;
}

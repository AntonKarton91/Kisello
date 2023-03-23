import { AuthService } from "./auth.service";
import { CreateUserDto } from "../user/dto/createUser.dto";
import { Request, Response } from "express";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(dto: CreateUserDto, response: Response): Promise<{
        id: import("mongoose").Types.ObjectId;
        name: string;
        surname: string;
        email: string;
        password: string;
        avatar: string;
        phoneNumber: string;
        accessToken: string;
    }>;
    login(dto: CreateUserDto, response: Response): Promise<{
        id: import("mongoose").Types.ObjectId;
        name: string;
        surname: string;
        email: string;
        password: string;
        avatar: string;
        phoneNumber: string;
        boards: import("../board/schemas/board.schema").Board[];
        accessToken: string;
    }>;
    logout(response: Response, request: Request): Promise<{
        statusCode: number;
    }>;
    getByToken(token: {
        token: string;
    }, response: Response): Promise<{
        id: any;
        name: string;
        surname: string;
        email: string;
        avatar: string;
        phoneNumber: string;
        boards: import("../board/schemas/board.schema").Board[];
        position: import("../user/schemas/types").TypeEmployerPosition;
    }>;
}

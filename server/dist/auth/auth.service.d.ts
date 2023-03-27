import { UserService } from "../user/user.service";
import { CreateUserDto } from "../user/dto/createUser.dto";
import { TokenService } from "../token/token.service";
import { Response } from "express";
export declare class AuthService {
    private userService;
    private tokenService;
    constructor(userService: UserService, tokenService: TokenService);
    login(res: Response, dto: CreateUserDto): Promise<{
        id: import("mongoose").Types.ObjectId;
        name: string;
        surname: string;
        email: string;
        password: string;
        avatar: string;
        phoneNumber: string;
        boards: import("../board/schemas/board.schema").Board[];
        position: import("../user/schemas/types").TypeEmployerPosition;
        accessToken: string;
    }>;
    register(res: Response, dto: CreateUserDto): Promise<{
        id: import("mongoose").Types.ObjectId;
        name: string;
        surname: string;
        email: string;
        password: string;
        avatar: string;
        phoneNumber: string;
        boards: import("../board/schemas/board.schema").Board[];
        position: import("../user/schemas/types").TypeEmployerPosition;
        accessToken: string;
    }>;
    getUserByToken(res: Response, token: {
        token: string;
    }): Promise<{
        id: any;
        name: string;
        surname: string;
        email: string;
        avatar: string;
        phoneNumber: string;
        boards: import("../board/schemas/board.schema").Board[];
        position: import("../user/schemas/types").TypeEmployerPosition;
    }>;
    private validateUser;
}

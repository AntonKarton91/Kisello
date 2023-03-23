/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../user/dto/createUser.dto";
import { Response } from "express";
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
        boards: import("../board/schemas/board.schema").Board[];
        position: import("../user/schemas/types").TypeEmployerPosition;
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
        position: import("../user/schemas/types").TypeEmployerPosition;
        accessToken: string;
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

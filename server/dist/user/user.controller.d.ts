import { UserService } from "./user.service";
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    findExtraData(params: any): Promise<{
        surname: string;
        position: import("./schemas/types").TypeEmployerPosition;
        phoneNumber: string;
    }>;
}

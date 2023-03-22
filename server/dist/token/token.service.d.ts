import { JwtService } from '@nestjs/jwt';
export declare class TokenService {
    private jwtService;
    constructor(jwtService: JwtService);
    generateToken(user: any): Promise<string>;
    verifyToken(token: string): Promise<any>;
}

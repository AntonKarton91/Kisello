import { HydratedDocument } from 'mongoose';
import mongoose from "mongoose";
import { User } from "../user/schemas/user.schema";
export type TokenDocument = HydratedDocument<Token>;
export declare class Token {
    userId: User;
    refreshToken: string;
}
export declare const TokenSchema: mongoose.Schema<Token, mongoose.Model<Token, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Token>;

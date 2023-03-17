import { HydratedDocument } from 'mongoose';
import mongoose from "mongoose";
import { Board } from "../../board/schemas/board.schema";
export declare enum UserRoleType {
    "ADMIN" = "Administrator",
    "WORKER" = "Worker"
}
export type UserDocument = HydratedDocument<User>;
export declare class User {
    name: string;
    email: string;
    password: string;
    role: UserRoleType;
    boards: Board[];
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, User>;

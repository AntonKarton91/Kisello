import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {HydratedDocument, ObjectId} from 'mongoose';
import mongoose from "mongoose";
import {Board} from "../../board/schemas/board.schema";

export enum UserRoleType  {
    "ADMIN"="Administrator",
    "WORKER"="Worker",
}

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({required: true})
    name: string;

    @Prop({required: true, unique: true})
    email: string;

    @Prop({required: true})
    password: string

    @Prop({required: true})
    role: UserRoleType

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'boards'}]})
    boards: Board[];

}

export const UserSchema = SchemaFactory.createForClass(User);

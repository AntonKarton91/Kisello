import { HydratedDocument, ObjectId } from 'mongoose';
import mongoose from "mongoose";
export type BoardDocument = HydratedDocument<Board>;
export declare class Board {
    title: string;
    users: ObjectId[];
    columns: ObjectId[];
    cardTags: ObjectId[];
}
export declare const BoardSchema: mongoose.Schema<Board, mongoose.Model<Board, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Board>;

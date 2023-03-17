import { HydratedDocument, ObjectId } from 'mongoose';
import mongoose from "mongoose";
export type ColumnDocument = HydratedDocument<Column>;
export declare class Column {
    name: string;
    cards: ObjectId[];
    board: ObjectId;
}
export declare const ColumnSchema: mongoose.Schema<Column, mongoose.Model<Column, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Column>;

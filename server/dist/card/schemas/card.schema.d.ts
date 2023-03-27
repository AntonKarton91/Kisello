import { HydratedDocument, ObjectId } from "mongoose";
import mongoose from "mongoose";
export type CardDocument = HydratedDocument<Card>;
export declare class Card {
    title: string;
    tagList: ObjectId[];
    date: Date;
    participants: ObjectId[];
    completed: boolean;
    boardId: ObjectId;
}
export declare const CardSchema: mongoose.Schema<Card, mongoose.Model<Card, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Card>;

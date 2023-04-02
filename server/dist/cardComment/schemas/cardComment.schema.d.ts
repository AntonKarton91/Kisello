import { HydratedDocument, ObjectId } from "mongoose";
import mongoose from "mongoose";
export type CardCommentDocument = HydratedDocument<CardComment>;
export declare class CardComment {
    createdAt: Date;
    body: string;
    cardId: ObjectId;
    userId: ObjectId;
}
export declare const CardCommentSchema: mongoose.Schema<CardComment, mongoose.Model<CardComment, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, CardComment>;

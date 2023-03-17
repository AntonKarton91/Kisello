import { HydratedDocument } from 'mongoose';
import mongoose from "mongoose";
export type CardTagDocument = HydratedDocument<CardTag>;
export declare class CardTag {
    title: string;
    color: string;
}
export declare const CardTagSchema: mongoose.Schema<CardTag, mongoose.Model<CardTag, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, CardTag>;

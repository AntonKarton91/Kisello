import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {HydratedDocument, ObjectId} from 'mongoose';
import mongoose from "mongoose";


export type CardTagDocument = HydratedDocument<CardTag>;

@Schema()
export class CardTag {
    @Prop({required: true})
    title: string;

    @Prop({required: true})
    color: string;

    @Prop({type: mongoose.Schema.Types.ObjectId})
    boardId: ObjectId;
}

export const CardTagSchema = SchemaFactory.createForClass(CardTag);

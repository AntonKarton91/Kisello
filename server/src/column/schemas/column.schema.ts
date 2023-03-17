import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {HydratedDocument, ObjectId} from 'mongoose';
import mongoose from "mongoose";


export type ColumnDocument = HydratedDocument<Column>;

@Schema()
export class Column {
    @Prop({required: true})
    name: string;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'cards'}]})
    cards: ObjectId[];

    board: ObjectId
}

export const ColumnSchema = SchemaFactory.createForClass(Column);

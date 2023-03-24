import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {HydratedDocument, ObjectId} from 'mongoose';
import mongoose from "mongoose";


export type CardDocument = HydratedDocument<Card>;

@Schema()
export class Card {
    @Prop({default: "Новая колонка"})
    title: string;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'cards'}]})
    cardList: ObjectId[];

    board: ObjectId
}

export const CardSchema = SchemaFactory.createForClass(Card);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {HydratedDocument, ObjectId} from 'mongoose';
import mongoose from "mongoose";
import {User} from "../../user/schemas/user.schema";


export type BoardDocument = HydratedDocument<Board>;

@Schema()
export class Board {
    @Prop({required: true})
    title: string;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'users'}]})
    users: ObjectId[];

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'columns'}]})
    columns: ObjectId[];

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'cardTags'}]})
    cardTags: ObjectId[];
}

export const BoardSchema = SchemaFactory.createForClass(Board);

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, ObjectId } from "mongoose";
import mongoose from "mongoose";


export type CardCommentDocument = HydratedDocument<CardComment>;

@Schema()
export class CardComment {
  @Prop({ default: new Date() })
  createdAt: Date;

  @Prop({ default: "" })
  body: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, required: true})
  cardId: ObjectId;

  @Prop({type: mongoose.Schema.Types.ObjectId, required: true})
  userId: ObjectId;
}

export const CardCommentSchema = SchemaFactory.createForClass(CardComment);

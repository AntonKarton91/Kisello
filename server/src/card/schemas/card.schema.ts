import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, ObjectId } from "mongoose";
import mongoose from "mongoose";


export type CardDocument = HydratedDocument<Card>;

@Schema()
export class Card {
  @Prop({ default: "Новая задача" })
  title: string;



  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "tags" }],
    default: []
  })
  tagList: ObjectId[];

  @Prop({ default: new Date() })
  date: Date;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "participants" }],
    default: []
  })
  participants: ObjectId[];

  @Prop({ default: false })
  completed: boolean;

  @Prop({type: mongoose.Schema.Types.ObjectId})
  boardId: ObjectId;
}

export const CardSchema = SchemaFactory.createForClass(Card);

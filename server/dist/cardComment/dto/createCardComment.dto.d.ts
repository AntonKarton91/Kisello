import { ObjectId } from "mongoose";
export declare class CreateCardCommentDto {
    body: string;
    cardId: ObjectId;
    userId: ObjectId;
}

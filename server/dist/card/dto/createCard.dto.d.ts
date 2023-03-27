import { ObjectId } from "mongoose";
export declare class CreateCardDto {
    title: string;
    columnId: ObjectId;
    boardId: ObjectId;
}

import {IS_LENGTH, IsEmail, IsString, Length} from 'class-validator';
import {ObjectId} from "mongoose";

export class CreateCardCommentDto {
    @IsString({message: 'Комментарий должен быть строкой'})
    body: string

    cardId: ObjectId

    userId: ObjectId
}
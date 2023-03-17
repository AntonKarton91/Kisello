import {IS_LENGTH, IsEmail, IsString, Length} from 'class-validator';
import {ObjectId} from "mongoose";

export class CreateColumnDto {
    @IsString({message: 'Название должно быть строкой'})
    name: string

    boardId: ObjectId
}
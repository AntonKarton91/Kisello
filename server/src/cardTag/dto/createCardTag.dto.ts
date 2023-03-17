import {IS_LENGTH, IsEmail, IsString, Length} from 'class-validator';
import {ObjectId} from "mongoose";

export class CreateCardTagDto {
    @IsString({message: 'Название должно быть строкой'})
    title: string;

    @IsString({message: 'Цвет должен быть строкой'})
    color: string;

    boardId: ObjectId;

}
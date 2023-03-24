import {IS_LENGTH, IsEmail, IsString, Length} from 'class-validator';
import {ObjectId} from "mongoose";

export class CreateCardDto {
    @IsString({message: 'Название должно быть строкой'})
    title: string

    columnId: ObjectId
}
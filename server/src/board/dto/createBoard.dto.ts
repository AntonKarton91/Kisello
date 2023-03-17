import {IS_LENGTH, IsEmail, IsString, Length} from 'class-validator';
import {ObjectId} from "mongoose";

export class CreateBoardDto {
    @IsString({message: 'Название должно быть строкой'})
    title: string;

    userId: ObjectId;
    }
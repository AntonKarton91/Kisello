import {IS_LENGTH, IsEmail, IsString, Length} from 'class-validator';

export class CreateUserDto {
    @IsString({message: 'Имя должно быть строкой'})
    name: string;

    @IsEmail()
    email: string;

    @Length(3, 32, {message: 'Пароль должен быть не менее 3 и не более 32 символов'})
    @IsString({message: 'Пароль должен быть строкой'})
    password: string
}
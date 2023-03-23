import {TypeEmployerPosition} from "../../../models/models";

export interface CreateUserDto {
    name: string
    surname: string
    email: string
    password: string
}

export interface LoginUserDto {
    email: string
    password: string
}



export interface IAuthDataResponse {
    id: string
    name: string
    surname: string
    email: string
    password: string
    avatar: string
    phoneNumber: string
    boards: string[]
    position: TypeEmployerPosition
    accessToken: string
}

export interface IUserResponse{
    id: string,
    name: string,
    surname: string,
    email: string,
    avatar: string,
    phoneNumber: string,
    boards: string[],
    position: TypeEmployerPosition
}

export interface IUserState{
    token: string | null
    id: string | null
    name: string
    email: string | null
    avatar: string
    surname: string | null
    position: TypeEmployerPosition
    phoneNumber: string | null
    accessToken: string | null
    boards: string[]
}
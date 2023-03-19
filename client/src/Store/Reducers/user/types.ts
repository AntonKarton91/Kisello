import {typeConnect} from "../../../types/typeConnect";
import {ICartPrev, IColumn, ITagList, TypeEmployerPosition} from "../../../models/models";

export interface CreateUserDto {
    name: string
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
    email: string
    accessToken: string
}

export interface IExtraUserResponse{
    surname: string
    position: TypeEmployerPosition
    phoneNumber: string
}

export interface IUserState{
    id: string | null
    name: string
    email: string | null
    avatar: string
    surname: string | null
    position: TypeEmployerPosition
    phoneNumber: string | null
    accessToken: string | null
    loading: boolean
    error: string | null
}
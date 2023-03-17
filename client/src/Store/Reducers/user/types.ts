import {typeConnect} from "../../../types/typeConnect";
import {ICartPrev, IColumn, ITagList} from "../../../models/models";

export interface CreateUserDto {
    name: string
    email: string
    password: string
}


export interface IAuthDataResponse {
    id: string
    name: string
    email: string
    accessToken: string
}



export interface IUserState {
    id: string | null
    name: string | null
    email: string | null
    accessToken: string | null
}
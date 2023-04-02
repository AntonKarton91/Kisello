import {typeConnect} from "../../../types/typeConnect";
import {ICartPrev, IColumn, IComment, ITagList} from "../../../models/models";

export interface IBoardUser {
    _id: string
    name: string
    surname: string
    avatar: string
}

export interface IBoardState {
    id: string
    title: string
    users: IBoardUser[]
    columns: IColumn[]
    cardList: ICartPrev[]
    cardTags: ITagList[]
    loading: boolean
    error: string | null
}



export interface IResponse {
    id: string
    title: string
    columns: IColumn[]
    cardList: ICartPrev[]
    users: IBoardUser[]
    cardTags: ITagList[]
}

export interface IBoardList {
    _id: string
    title: string
}
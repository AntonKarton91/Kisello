import {IComment} from "../../../models/models";

export interface ICommentState {
    comments: IComment[]
    loading: boolean
    error: string | null
}

export interface ICommentListResponse {
    comments: IComment[]
    cardId: string
}


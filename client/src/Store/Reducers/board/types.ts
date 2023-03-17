import {typeConnect} from "../../../types/typeConnect";
import {ICartPrev, IColumn, ITagList} from "../../../models/models";


export interface IBoardState {
    columns: IColumn[],
    cards: ICartPrev[],
    cardTags: ITagList[],
    loading: boolean
    error: string | null
}



export interface IResponse {
    columnsData: IColumn[]
    // cardsData: ICartPrev[]
    // cardTagsData: ITagList[]
}
import {createSlice} from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {ICartPrev, IColumn, ITagList, IUser} from "../../../models/models";
import {IBoardState} from "./types";
import {fetchBoardData} from "./thunks";


const initialState: IBoardState = {
    columns: [],
    cards: [],
    cardTags: [],
    loading: false,
    error: null
}


export const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        addColumn: (state, action: PayloadAction<IColumn>) => {
            console.log(action.payload)
            const a: IColumn = {...action.payload, cardList: []}
            state.columns.push({...action.payload, cardList: []})
        },

        addCard: (state, action: PayloadAction<{newCard: ICartPrev, columnId: string}>) => {
            state.cards.push(action.payload.newCard)
            state.columns.find(c=> c.id === action.payload.columnId)?.cardList.push(action.payload.newCard.id)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBoardData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBoardData.fulfilled, (state, action) => {
                state.columns = action.payload.columnsData;
                // state.cards = action.payload.cardsData;
                // state.cardTags = action.payload.cardTagsData;
                state.loading = false;
            })
    }
})

export const { addCard, addColumn } = boardSlice.actions

export default boardSlice.reducer
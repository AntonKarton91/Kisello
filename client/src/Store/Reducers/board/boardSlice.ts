import {createSlice} from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {ICartPrev, IColumn, ITagList, IUser} from "../../../models/models";
import {IBoardState} from "./types";
import {fetchBoardData} from "./thunks";


const initialState: IBoardState = {
    id: "",
    title: '',
    users: [],
    columns: [],
    cardList: [],
    cardTags: [],
    loading: false,
    error: null
}


export const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        addColumn: (state, action) => {
            state.columns.push({...action.payload, cardList: []})
        },

        sendAddNewColumn: (state, action) => {},
        sendUpdateColumn: (state, action) => {},

        updateColumn: (state, action: PayloadAction<{data: any, columnId: string}>) => {
            const column = state.columns.find(col => col._id === action.payload.columnId)
            if (column) {
                const updatedColumn = {...column, ...action.payload.data}
                state.columns = state.columns.map(e=>{
                    if (e._id === action.payload.columnId) {
                        return updatedColumn
                    } else return e
                })
            }

        },

        addCard: (state, action: PayloadAction<{newCard: ICartPrev, columnId: string}>) => {
            state.cardList.push(action.payload.newCard)
            state.columns.find(c=> c._id === action.payload.columnId)?.cardList.push(action.payload.newCard.id)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBoardData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBoardData.fulfilled, (state, action) => {
                state.title = action.payload.title
                state.id = action.payload.id
                state.columns = action.payload.columns
                state.loading = false;
            })
    }
})

export const { addCard, addColumn, updateColumn, sendAddNewColumn, sendUpdateColumn } = boardSlice.actions

export default boardSlice.reducer
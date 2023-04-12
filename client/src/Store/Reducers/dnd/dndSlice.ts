import {createSlice} from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {ICartPrev, IColumn, IComment, ITagList, IUser} from "../../../models/models";
import {IDndState} from "./types";



const initialState: IDndState = {
    cardFrom: '',
    columnFrom: "",
}


export const dndSlice = createSlice({
    name: 'dnd',
    initialState,
    reducers: {
        updateDnd: (state, action: PayloadAction<{cardFrom: string, columnFrom: string}>) => {
            state.cardFrom = action.payload.cardFrom
            state.columnFrom = action.payload.columnFrom
        },
        removeDnd: (state ) => {
            state.cardFrom = ""
            state.columnFrom = ""
        },
    },

})

export const {
    removeDnd,
    updateDnd
} = dndSlice.actions

export default dndSlice.reducer
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
        sendAddCardToColumn: (state, action) => {},
        sendCardUpdate: (state, action) => {},

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

        cardUpdate: (state, action: PayloadAction<{data: any, cardId: string}>) => {
                console.log(action.payload.data)
            const card = state.cardList.find(card => card._id === action.payload.cardId)
            if (card) {
                const updatedCard = {...card, ...action.payload.data}
                state.cardList = state.cardList.map(e=>{
                    if (e._id === action.payload.cardId) {
                        return updatedCard
                    } else return e
                })
            }

        },

        addCardToColumn: (state, action: PayloadAction<{data: ICartPrev, columnId: string}>) => {
            state.cardList.push(action.payload.data)
            state.columns.find(c=> c._id === action.payload.columnId)?.cardList.push(action.payload.data._id)
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
                state.cardList = action.payload.cardList;
                state.users = action.payload.users;
            })
    }
})

export const {
    addColumn,
    updateColumn,
    sendAddNewColumn,
    sendUpdateColumn,
    sendAddCardToColumn,
    addCardToColumn,
    sendCardUpdate,
    cardUpdate,
} = boardSlice.actions

export default boardSlice.reducer
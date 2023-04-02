import {createSlice} from '@reduxjs/toolkit'
import {ICommentState} from "./types";
import {fetchComments} from "./thunks";


const initialState: ICommentState = {
    comments: [],
    openedCard: "",
    loading: false,
    error: null
}


export const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.comments = action.payload.comments
                state.openedCard = action.payload.cardId
                state.loading = false
            })
    }
})

export const {

} = commentSlice.actions

export default commentSlice.reducer
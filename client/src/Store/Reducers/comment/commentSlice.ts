import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ICommentState} from "./types";
import {fetchComments} from "./thunks";
import {IComment} from "../../../models/models";


const initialState: ICommentState = {
    comments: [],
    loading: false,
    error: null
}


export const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        sendAddComment: (state, action) => {},
        sendDeleteComment: (state, action) => {},
        addComment: (state, action:PayloadAction<IComment>) => {
            state.comments.push(action.payload)
        },
        deleteComment: (state, action:PayloadAction<IComment>) => {
            state.comments = state.comments.filter(c=>c._id !== action.payload._id)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.comments = action.payload.comments
                state.loading = false
            })
    }
})

export const {
    deleteComment,
    sendDeleteComment,
    addComment,
    sendAddComment
} = commentSlice.actions

export default commentSlice.reducer
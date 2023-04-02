import {createAsyncThunk} from "@reduxjs/toolkit";
import {ICommentListResponse} from "./types";
import axios from "axios";

export const fetchComments = createAsyncThunk<ICommentListResponse, string, {rejectValue: string}>(
    'comment/fetchComments',
    async function (cardId, { rejectWithValue }) {
        const { data: comments } = await axios.post<ICommentListResponse>(
            process.env.REACT_APP_NEXT_PUBLIC_DOMAIN + "comment/getbycardid",
            {cardId}
        );
        return comments
    }
);


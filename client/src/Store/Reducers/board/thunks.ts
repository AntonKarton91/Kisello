import {createAsyncThunk} from "@reduxjs/toolkit";
import {IResponse} from "./types";
import axios from "axios";


export const fetchBoardData = createAsyncThunk<IResponse, string, {rejectValue: string}>(
    'board/fetchBoardData',
    async function (boardId, { rejectWithValue }) {
        const { data: board } = await axios(`http://localhost:5000/board/${boardId}`);
        const { data: columns } = await axios.post("http://localhost:5000/column/getbyboardid", {boardId});
        return {
            id: board._id,
            title: board.title,
            columns
        };
    }
);


import {createAsyncThunk} from "@reduxjs/toolkit";
import {IResponse} from "./types";


export const fetchBoardData = createAsyncThunk<IResponse, undefined, {rejectValue: string}>(
    'board/fetchColumnList',
    async function (_, { rejectWithValue }) {
        const columns = await fetch("http://localhost:5000/column");
        // const cards = await fetch("http://localhost:5000/cards");
        // const cardTags = await fetch("http://localhost:5000/cardTags");
        // if (!columns || !cards || !cardTags) {
        //     return rejectWithValue('Server Error!');
        // }
        const columnsData = await columns.json();
        console.log(columnsData)
        // const cardsData = await cards.json();
        // const cardTagsData = await cardTags.json();
        return {
            columnsData,
            // cardsData,
            // cardTagsData
        };
    }
);
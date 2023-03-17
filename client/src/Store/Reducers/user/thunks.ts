import {createAsyncThunk} from "@reduxjs/toolkit";
import {CreateUserDto, IAuthDataResponse} from "./types";
import axios from "axios";


export const registerUser = createAsyncThunk<IAuthDataResponse, CreateUserDto, {rejectValue: string}>(
    'user/register',
// @ts-ignore
    async function (userData, { rejectWithValue }) {
        console.log(userData)
        const {data} = await axios.post("http://localhost:5000/auth/register", userData);
        localStorage.setItem("accessToken", data.accessToken)
        return {
            user: data,
        };
    }
);
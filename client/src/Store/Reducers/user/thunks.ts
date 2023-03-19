import {createAsyncThunk} from "@reduxjs/toolkit";
import {CreateUserDto, IAuthDataResponse, IExtraUserResponse, LoginUserDto} from "./types";
import axios from "axios";


export const registerUser = createAsyncThunk<IAuthDataResponse, CreateUserDto, {rejectValue: string}>(
    'user/register',
// @ts-ignore
    async function (userData, { rejectWithValue }) {
        try {
            const {data} = await axios.post("http://localhost:5000/auth/register", userData);
            localStorage.setItem("accessToken", data.accessToken)
            return {
                ...data,
            };
        } catch (e) {
            if (e instanceof Error){
                return rejectWithValue(e.message);
            }
        }

    }
);

export const loginUser = createAsyncThunk<IAuthDataResponse, LoginUserDto, {rejectValue: string}>(
    'user/login',
    async function (userData, { rejectWithValue }) {
        try {
            const {data} = await axios.post("http://localhost:5000/auth/login", userData);
            localStorage.setItem("accessToken", data.accessToken)
            return {
                ...data
            };
        } catch (e) {
            if (e instanceof Error){
                return rejectWithValue(e.message);
            }
        }

    }
);

export const fetchExtraUser = createAsyncThunk<IExtraUserResponse, string, {rejectValue: string}>(
    'user/getExtraUser',
    async function (userId, { rejectWithValue }) {
        try {
            const {data} = await axios.get("http://localhost:5000/user/getExtraUser", {params: {id: userId}});
            return {
                ...data
            };
        } catch (e) {
            if (e instanceof Error){
                return rejectWithValue(e.message);
            }
        }

    }
);
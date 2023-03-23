// import {createAsyncThunk} from "@reduxjs/toolkit";
// import {CreateUserDto, IAuthDataResponse, IUserResponse, LoginUserDto} from "./types";
// import axios from "axios";
//
//
// export const registerUser = createAsyncThunk<IAuthDataResponse, CreateUserDto, {rejectValue: string}>(
//     'user/register',
// // @ts-ignore
//     async function (userData, { rejectWithValue }) {
//         try {
//             const {data} = await axios.post("http://localhost:5000/auth/register", userData);
//             localStorage.setItem("accessToken", data.accessToken)
//             return {
//                 ...data,
//             };
//         } catch (e) {
//             if (e instanceof Error){
//                 return rejectWithValue(e.message);
//             }
//         }
//
//     }
// );
//
// export const loginUser = createAsyncThunk<IAuthDataResponse, LoginUserDto, {rejectValue: string}>(
//     'user/login',
//     async function (userData, { rejectWithValue }) {
//         try {
//             const {data} = await axios.post("http://localhost:5000/auth/login", userData);
//             localStorage.setItem("accessToken", data.accessToken)
//             return {
//                 ...data
//             };
//         } catch (e) {
//             if (e instanceof Error){
//                 return rejectWithValue(e.message);
//             }
//         }
//
//     }
// );
//
// export const fetchUserByToken = createAsyncThunk<IUserResponse, string, {rejectValue: string}>(
//     'user/fetchUserByToken',
//     async function (token, { rejectWithValue }) {
//         try {
//             const {data} = await axios.post("http://localhost:5000/auth/getbytoken", {token});
//             return {
//                 ...data
//             };
//         } catch (e) {
//             if (e instanceof Error){
//                 // @ts-ignore
//                 if (e.response.status === 400) {
//                     localStorage.removeItem("accessToken")
//                 }
//                 return rejectWithValue(e.message);
//             }
//         }
//
//     }
// );
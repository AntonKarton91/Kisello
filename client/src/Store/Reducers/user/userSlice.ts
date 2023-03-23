import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IUserState} from "./types";
import {fetchUserByToken, loginUser, registerUser} from "./thunks";
import {IColumn, TypeEmployerPosition} from "../../../models/models";


const initialState: IUserState= {
    token: null,
    id: null,
    name: "",
    surname: "",
    email: "",
    avatar: "",
    accessToken: null,
    position: TypeEmployerPosition.Worker,
    phoneNumber: "",
    boards: [],
    loading: false,
    error: null,
}


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            console.log(action.payload)
            state.email = action.payload.email
            state.name = action.payload.name
            state.surname = action.payload.surname
            state.id = action.payload.id
            state.avatar = action.payload.avatar
            state.phoneNumber = action.payload.phoneNumber
            state.boards = action.payload.boards
            state.position = action.payload.position
            state.token = action.payload.accessToken
        },
        removeUser: (state, action) => {
            state.email = ""
            state.name = ""
            state.surname = ""
            state.id = null
            state.avatar = ""
            state.phoneNumber = ""
            state.boards = []
            state.position = TypeEmployerPosition.Worker
        },
    },
    // extraReducers: (builder) => {
    //     builder.addCase(registerUser.pending, (state) => {
    //         state.loading = true;
    //         state.error = null;
    //     })
    //     builder.addCase(registerUser.rejected, (state, action) => {
    //         state.error = action.payload as string;
    //     })
    //     .addCase(registerUser.fulfilled, (state, action) => {
    //         state.accessToken = action.payload.accessToken
    //         state.email = action.payload.email
    //         state.name = action.payload.name
    //         state.surname = action.payload.surname
    //         state.id = action.payload.id
    //         state.loading = false
    //     })
    //
    //
    //     .addCase(loginUser.fulfilled, (state, action) => {
    //         state.email = action.payload.email
    //         state.name = action.payload.name
    //         state.surname = action.payload.surname
    //         state.id = action.payload.id
    //         state.loading = false
    //         state.error = null
    //         state.isAuth = true
    //     })
    //     builder.addCase(loginUser.pending, (state) => {
    //         state.loading = true;
    //         state.error = null;
    //     })
    //     builder.addCase(loginUser.rejected, (state, action) => {
    //         state.loading = false
    //         state.error = action.payload as string;
    //     })
    //
    //
    //     .addCase(fetchUserByToken.fulfilled, (state, action) => {
    //         state.id = action.payload.id
    //         state.name = action.payload.name
    //         state.surname = action.payload.surname
    //         state.email = action.payload.email
    //         state.avatar = action.payload.avatar
    //         state.phoneNumber = action.payload.phoneNumber
    //         state.boards = action.payload.boards
    //         state.position = action.payload.position
    //         state.loading = false;
    //     })
    //     builder.addCase(fetchUserByToken.pending, (state) => {
    //         state.loading = true;
    //         state.error = null;
    //     })
    //     builder.addCase(fetchUserByToken.rejected, (state, action) => {
    //         state.error = action.payload as string;
    //     })
    // }
})

export const { login, removeUser } = userSlice.actions

export default userSlice.reducer
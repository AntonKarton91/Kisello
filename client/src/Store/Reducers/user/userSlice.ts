import {createSlice} from '@reduxjs/toolkit'
import {IUserState} from "./types";
import {fetchExtraUser, loginUser, registerUser} from "./thunks";
import {TypeEmployerPosition} from "../../../models/models";


const initialState: IUserState= {
    id: null,
    name: "",
    surname: "",
    email: "",
    avatar: "",
    accessToken: null,
    loading: false,
    error: null,
    position: TypeEmployerPosition.Worker,
    phoneNumber: ""
}


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(registerUser.rejected, (state, action) => {
            state.error = action.payload as string;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state = {...state, ...action.payload}
            state.loading = false
        })


        .addCase(loginUser.fulfilled, (state, action) => {
            state = {...state, ...action.payload}
            state.loading = false
        })
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.error = action.payload as string;
        })


        .addCase(fetchExtraUser.fulfilled, (state, action) => {
            state = {...state, ...action.payload};
            state.loading = false;
        })
        builder.addCase(fetchExtraUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(fetchExtraUser.rejected, (state, action) => {
            state.error = action.payload as string;
        })
    }
})

export const { } = userSlice.actions

export default userSlice.reducer
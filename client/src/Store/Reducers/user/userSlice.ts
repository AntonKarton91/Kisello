import {createSlice} from '@reduxjs/toolkit'
import {IUserState} from "./types";
import {registerUser} from "./thunks";


const initialState: IUserState = {
    id: null,
    name: null,
    email: null,
    accessToken: null

}


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.fulfilled, (state, action) => {
                state = {...action.payload}
            })
    }
})

export const { } = userSlice.actions

export default userSlice.reducer
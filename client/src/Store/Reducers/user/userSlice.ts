import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IAuthDataResponse, IUserState} from "./types";
import {TypeEmployerPosition} from "../../../models/models";


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
}


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<IAuthDataResponse>) => {
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
})

export const { login, removeUser } = userSlice.actions

export default userSlice.reducer
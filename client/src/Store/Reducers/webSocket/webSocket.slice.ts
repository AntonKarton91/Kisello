import { createSlice } from '@reduxjs/toolkit';
import { typeConnect } from '../../../types/typeConnect';
import { WebSocketState } from './types';
import {fetchBoardData} from "../board/thunks";
// import {webSocketConnect} from "./thunks";


const initialState : WebSocketState = {
    socket: null,
    connect: typeConnect.Disconnected
}
const WebSocketSlice = createSlice({
    name: 'webSocket',
    initialState,
    reducers: {
        wsConnect ( state ) {
            state.connect = typeConnect.Connected
        },
        // wsConnect ( state, action ) {
        //     state.socket = action.payload.socket
        //     state.connect = typeConnect.Connected
        // },
        wsDisconnect ( state ) {
            state.socket = null
            state.connect = typeConnect.Disconnected
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(webSocketConnect.pending, (state) => {
    //         })
    //         .addCase(webSocketConnect.fulfilled, (state, action) => {
    //             // @ts-ignore
    //             state.socket = action.payload
    //
    //         })
    // }
})
export const { wsConnect, wsDisconnect } = WebSocketSlice.actions
export default WebSocketSlice.reducer
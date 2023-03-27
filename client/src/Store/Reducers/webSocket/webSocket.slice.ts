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
        },

        Connect ( state ) {
            state.connect = typeConnect.Connected
        },

        Disconnect ( state ) {
            state.connect = typeConnect.Disconnected
        },

        wsDisconnect ( state ) {
        },
    },
})
export const { wsConnect, Connect, wsDisconnect, Disconnect } = WebSocketSlice.actions
export default WebSocketSlice.reducer
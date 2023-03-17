import { WebSocketState } from './../Reducers/webSocket/types';
import { Middleware } from "@reduxjs/toolkit";
import { io, Socket } from "socket.io-client";
import { AppState } from "../types";
import { typeConnect } from '../../types/typeConnect';
import {IBoardState} from "../Reducers/board/types";
import {addColumn} from "../Reducers/board/boardSlice";
let socket: Socket
//
export const webSocketMiddleware: Middleware<{}, AppState> = store => next => action => {
    const webSocketState: WebSocketState = store.getState().webSocket
    const boardState: IBoardState = store.getState().board
    if (webSocketState.connect === typeConnect.Disconnected && !socket) {
        socket = io("ws://localhost:5001")
        socket.on('connect', () => {
            console.log("Соединение установлено")
        })
        socket.on('connect_error', () => {
            console.log("Ошибка соединения")
        })
    }

    socket.on('addNewColumn', (message) => {
        console.log(message)
        // store.dispatch(addColumn({ message }))
    })


    if (action.type === 'webSocket/addNewColumn') {
        console.log(action.payload)
        // socket.emit('addNewColumn', action.payload)
    }

    return next(action)
}
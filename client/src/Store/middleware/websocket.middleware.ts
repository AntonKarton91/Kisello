import { WebSocketState } from './../Reducers/webSocket/types';
import {Middleware, PayloadAction} from "@reduxjs/toolkit";
import { io, Socket } from "socket.io-client";
import { AppState } from "../types";
import { typeConnect } from '../../types/typeConnect';
import {IBoardState} from "../Reducers/board/types";
import {addColumn, updateColumn} from "../Reducers/board/boardSlice";
import {IColumn} from "../../models/models";
let socket: Socket
//


export const webSocketMiddleware: Middleware<{}, AppState> = store => next => action => {
    const webSocketState: WebSocketState = store.getState().webSocket
    const boardState: IBoardState = store.getState().board

    const add = (message: IColumn) => {
        store.dispatch(addColumn(message))
    }

    const rename = (message: {columnName: string, columnId: string}) => {
        console.log(message)
        store.dispatch(updateColumn(message))
    }

    switch (action.type) {
        case 'webSocket/wsConnect': {
            if (webSocketState.connect === typeConnect.Disconnected && !socket) {
                socket = io("ws://localhost:5000")
                socket.on('connect', () => {
                    console.log("Соединение установлено")
                })
                socket.on('connect_error', () => {
                    console.log("Ошибка соединения")
                })
                socket.on('addNewColumn', add)
                socket.on('changeColumnName', rename)
            }


            break
        }
        case 'webSocket/wsDisсonnect': {
            socket.disconnect()
            socket.off('addNewColumn', add)
            console.log("Соединение разорвано")
            break
        }
        case 'board/sendAddNewColumn': {
            return socket.emit("addNewColumn",action.payload)
        }

        case 'board/sendUpdateColumn': {
            console.log(action.payload)
            return socket.emit("changeColumnName", action.payload)
        }

    }

    return next(action)
}
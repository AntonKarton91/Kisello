import { WebSocketState } from './../Reducers/webSocket/types';
import {Middleware, PayloadAction} from "@reduxjs/toolkit";
import { io, Socket } from "socket.io-client";
import { AppState } from "../types";
import { typeConnect } from '../../types/typeConnect';
import {IBoardState} from "../Reducers/board/types";
import {addCardToColumn, addColumn, cardUpdate, updateColumn} from "../Reducers/board/boardSlice";
import {ICartPrev, IColumn} from "../../models/models";
import {Connect, Disconnect} from "../Reducers/webSocket/webSocket.slice";
let socket: Socket
//


export const webSocketMiddleware: Middleware<{}, AppState> = store => next => action => {
    const webSocketState: WebSocketState = store.getState().webSocket
    const boardState: IBoardState = store.getState().board

    const add = (message: IColumn) => {
        store.dispatch(addColumn(message))
    }

    const columnUpdate = (message: {data: any, columnId: string}) => {
        console.log(message)
        store.dispatch(updateColumn(message))
    }

    const addCardToCol = (message: {data: ICartPrev, columnId: string}) => {
        console.log(message)
        store.dispatch(addCardToColumn(message))
    }
    const cardUploadHandler = (message: {data: ICartPrev, cardId: string}) => {
        console.log(message)
        store.dispatch(cardUpdate(message))
    }

    switch (action.type) {
        case 'webSocket/wsConnect': {
            if (webSocketState.connect === typeConnect.Disconnected && !socket?.connected) {
                socket = io("ws://localhost:5000")
                socket.on('connect', () => {
                    console.log("Соединение установлено")
                })
                socket.on('connect_error', () => {
                    console.log("Ошибка соединения")
                })
                socket.on('addNewColumn', add)
                socket.on('columnUpdate', columnUpdate)
                socket.on('addCardToColumn', addCardToCol)
                socket.on('cardUpdate', cardUploadHandler)
                socket.on('disconnect', ()=> {
                    console.log("Соединение разорвано")
                })
                store.dispatch(Connect())
            }
            break
        }
        case 'webSocket/wsDisconnect': {
            if (socket){
                socket.disconnect()
                store.dispatch(Disconnect())
                break
            }
        }
        case 'board/sendAddNewColumn': {
            return socket.emit("addNewColumn",action.payload)
        }

        case 'board/sendCardUpdate': {
            return socket.emit("sendCardUpdate",action.payload)
        }

        case 'board/sendAddCardToColumn': {
            return socket.emit("sendAddCardToColumn",action.payload)
        }

        case 'board/sendUpdateColumn': {
            console.log(action.payload)
            return socket.emit("columnUpdate", action.payload)
        }

    }

    return next(action)
}
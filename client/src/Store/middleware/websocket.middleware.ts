import {WebSocketState} from './../Reducers/webSocket/types';
import {Middleware, PayloadAction} from "@reduxjs/toolkit";
import {io, Socket} from "socket.io-client";
import {AppState} from "../types";
import {typeConnect} from '../../types/typeConnect';
import {IBoardState} from "../Reducers/board/types";
import {addCardToColumn, addColumn, boardSlice, cardUpdate, DNDCard, updateColumn} from "../Reducers/board/boardSlice";
import {ICartPrev, IColumn, IComment} from "../../models/models";
import {Connect, Disconnect} from "../Reducers/webSocket/webSocket.slice";
import {addComment, deleteComment} from "../Reducers/comment/commentSlice";
import {ICommentState} from "../Reducers/comment/types";
import {IDndState} from "../Reducers/dnd/types";
import {removeDnd} from "../Reducers/dnd/dndSlice";

let socket: Socket
//


export const webSocketMiddleware: Middleware<{}, AppState> = store => next => action => {
    const webSocketState: WebSocketState = store.getState().webSocket
    const boardState: IBoardState = store.getState().board
    const dndState: IDndState = store.getState().dnd

    const add = (message: IColumn) => {
        store.dispatch(addColumn(message))
    }

    const columnUpdate = (message: { data: any, columnId: string }) => {
        store.dispatch(updateColumn(message))
    }

    const addCardToCol = (message: { data: ICartPrev, columnId: string }) => {
        store.dispatch(addCardToColumn(message))
    }

    const cardUploadHandler = (message: { data: ICartPrev, cardId: string }) => {
        store.dispatch(cardUpdate(message))
    }

    const addCommentToCard = (message: IComment) => {
        if (localStorage.getItem("openedCard")) {
            if (localStorage.getItem("openedCard") === message.cardId) {
                store.dispatch(addComment(message))
            }
        }
    }

    const deleteCommentFromCard = (message: IComment) => {
        if (localStorage.getItem("openedCard")) {
            if (localStorage.getItem("openedCard") === message.cardId) {
                store.dispatch(deleteComment(message))
            }
        }
    }

    const DNDCardHandler = (message: {columnFrom: string, cardsFrom: string[], columnTo: string, cardsTo: string[]}) => {
            store.dispatch(DNDCard(message))
            store.dispatch(removeDnd())
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
                socket.on('DNDCard', DNDCardHandler)
                socket.on('addComment', addCommentToCard)
                socket.on('deleteComment', deleteCommentFromCard)
                socket.on('cardUpdate', cardUploadHandler)
                socket.on('disconnect', () => {
                    console.log("Соединение разорвано")
                })
                store.dispatch(Connect())
            }
            break
        }
        case 'webSocket/wsDisconnect': {
            if (socket) {
                socket.disconnect()
                store.dispatch(Disconnect())
                break
            }
        }
        case 'board/sendAddNewColumn': {
            return socket.emit("addNewColumn", action.payload)
        }

        case 'board/sendCardUpdate': {
            return socket.emit("sendCardUpdate", action.payload)
        }

        case 'board/sendAddCardToColumn': {
            return socket.emit("sendAddCardToColumn", action.payload)
        }

        case 'comment/sendAddComment': {
            return socket.emit("sendAddComment", action.payload)
        }

        case 'comment/sendDeleteComment': {
            return socket.emit("sendDeleteComment", action.payload)
        }

        case 'board/sendUpdateColumn': {
            return socket.emit("columnUpdate", action.payload)
        }

        case 'board/sendDNDCard': {
            const {columns} = boardState
            const {cardFrom, columnFrom} = dndState
            const {item, options, cardTo, columnData: columnTo} = action.payload
            const a = columns.find(c => c._id === columnFrom)
            if (a) {
                const cardsFrom = a.cardList.filter(c => c !== cardFrom)
                let newState = columns.map(c => {
                    if (c._id === columnFrom) {
                        return {...c, cardList: cardsFrom}
                    } else return c
                })
                const stateColumnTo = newState.find(c => c._id === columnTo)
                if (stateColumnTo) {
                    if (options.type === "filled") {
                        const index = stateColumnTo.cardList.indexOf(cardTo)
                        const cardsTo = [...stateColumnTo.cardList]
                        options.position === "prev"
                            ? cardsTo.splice(index, 0, cardFrom)
                            : cardsTo.splice(index + 1, 0, cardFrom)
                        return socket.emit("sendDNDCard", {columnFrom, cardsFrom, columnTo, cardsTo})
                    } else  {
                        let cardsTo = [...stateColumnTo.cardList]
                        cardsTo.push(cardFrom)
                        return socket.emit("sendDNDCard", {columnFrom, cardsFrom, columnTo, cardsTo})
                    }
                }
            }
        }
    }

    return next(action)
}
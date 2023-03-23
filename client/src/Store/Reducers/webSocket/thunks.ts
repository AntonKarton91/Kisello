// import {createAsyncThunk} from "@reduxjs/toolkit";
// import {io, Socket} from "socket.io-client";
// import {wsConnect, wsDisconnect} from "./webSocket.slice";
// import {IColumn} from "../../../models/models";
// import {addColumn, updateColumn} from "../board/boardSlice";
// import {useAppDispatch} from "../../hooks";
// import {AppState} from "../../types";
//
//
// export const webSocketConnect = createAsyncThunk<Socket, Socket, {state: AppState }>(
//     'webSocket/connect',
//     // @ts-ignore
//     async function (socket, {getState, dispatch}) {
//         const state = getState()
//         socket = io("ws://localhost:5000")
//         const columns = state.board.columns
//         console.log(state.board)
//         function onConnect() {
//             console.log("Соединение установлено")
//         }
//
//         function onDisconnect() {
//             console.log("Соединение разорвано")
//             // dispatch(wsDisconnect())
//         }
//
//         function onConnectError() {
//             console.log("Ошибка соединения")
//         }
//
//         function onAddNewColumn(column: IColumn): void {
//             dispatch(addColumn(column))
//         }
//
//         function columnChange(payload: {columnName: string, columnId: string}): void {
//             console.log(payload)
//             dispatch(updateColumn(payload))
//         }
//
//
//
//         socket.on('connect', onConnect)
//         socket.on('disconnect', onDisconnect)
//         socket.on('connect_error', onConnectError)
//         socket.on('addNewColumn', onAddNewColumn)
//         socket.on('changeColumnName', columnChange)
//
//         return socket
//
//     }
// );

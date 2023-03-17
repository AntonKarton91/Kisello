// import {io, Socket} from "socket.io-client";
// import {addColumn} from "../Store/Reducers/board/userSlice";
//
//
// export let socket: Socket = io("ws://localhost:5000")
//
// // export type ISocketEvent = ()
//
//
// export const socketEvents = {
//     connect: () => {
//         socket.on('connect', () => {
//             console.log("Соединение установлено")
//         })
//     },
//     connectError: () => {
//         socket.on('connect_error', () => {
//             console.log("Ошибка соединения")
//         })
//     },
//     addNewColumn: () => {
//         socket.on('addNewColumn', (message) => {
//             console.log(message)
//             dispatch(addColumn(message))
//         })
//     }
//
// }
//
//

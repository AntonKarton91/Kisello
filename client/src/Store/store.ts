import { configureStore } from '@reduxjs/toolkit'
import boardReducer from "./Reducers/board/boardSlice"
import {webSocketMiddleware} from "./middleware/websocket.middleware";
import webSocketReducer from './Reducers/webSocket/webSocket.slice'
import {AppState} from "./types";

export const store = configureStore<AppState>({
    reducer: {
        webSocket: webSocketReducer,
        board: boardReducer,

    },
    // middleware: [webSocketMiddleware],
    devTools: true
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
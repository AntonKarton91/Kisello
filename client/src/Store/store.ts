import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import boardReducer from "./Reducers/board/boardSlice"
import {webSocketMiddleware} from "./middleware/websocket.middleware";
import webSocketReducer from './Reducers/webSocket/webSocket.slice'
import userReducer from './Reducers/user/userSlice'
import {AppState} from "./types";
import {authMiddleware} from "./middleware/auth.middleware";



export const store = configureStore<AppState>({
    reducer: {
        webSocket: webSocketReducer,
        board: boardReducer,
        user: userReducer
    },
// @ts-ignore
//     middleware: getDefaultMiddleware({
//         serializableCheck: false,
//     }),
    middleware:  (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat([webSocketMiddleware, authMiddleware])
    },
    devTools: true
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import boardReducer from "./Reducers/board/boardSlice"
import {webSocketMiddleware} from "./middleware/websocket.middleware";
import webSocketReducer from './Reducers/webSocket/webSocket.slice'
import userReducer from './Reducers/user/userSlice'
import {AppState} from "./types";
import {authMiddleware} from "./middleware/auth.middleware";
import commentReducer from "./Reducers/comment/commentSlice";
import dndReducer from "./Reducers/dnd/dndSlice";



export const store = configureStore<AppState>({
    reducer: {
        webSocket: webSocketReducer,
        board: boardReducer,
        comments: commentReducer,
        user: userReducer,
        dnd: dndReducer
    },
// @ts-ignore
    middleware:  (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat([webSocketMiddleware, authMiddleware])
    },
    devTools: true
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
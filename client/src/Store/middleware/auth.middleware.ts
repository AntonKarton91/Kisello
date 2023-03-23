import { WebSocketState } from './../Reducers/webSocket/types';
import {Middleware, PayloadAction} from "@reduxjs/toolkit";
import { io, Socket } from "socket.io-client";
import { AppState } from "../types";
import { typeConnect } from '../../types/typeConnect';
import {IBoardState} from "../Reducers/board/types";
import {addColumn} from "../Reducers/board/boardSlice";
import {IColumn} from "../../models/models";
import axios from "axios";
let socket: Socket
//
export const authMiddleware: Middleware<{}, AppState> = store => next => async (action) => {
    switch (action.type) {
        case 'user/login': {
            // const { data } = await axios.post(process.env.REACT_APP_NEXT_PUBLIC_DOMAIN + "auth/login", action.payload)
            if (action.payload.accessToken) {
                localStorage.setItem("accessToken", action.payload.accessToken)
            }
            next(action)
        }
        // case 'user/register': {
        //     const { data } = await axios.post(process.env.REACT_APP_NEXT_PUBLIC_DOMAIN + "auth/register", action.payload)
        //     localStorage.setItem("accessToken", action.payload.accessToken)
        //     next({...action, payload: data})
        // }
    }

    return next(action)
}
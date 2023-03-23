import {Middleware} from "@reduxjs/toolkit";
import { AppState } from "../types";

export const authMiddleware: Middleware<{}, AppState> = store => next => async (action) => {
    switch (action.type) {
        case 'user/login': {
            if (action.payload.accessToken) {
                localStorage.setItem("accessToken", action.payload.accessToken)
            }
            next(action)
        }
    }

    return next(action)
}
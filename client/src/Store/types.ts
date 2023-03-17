import { WebSocketState } from './Reducers/webSocket/types';
import {IBoardState} from "./Reducers/board/types";


export interface AppState {
    webSocket: WebSocketState,
    board: IBoardState
}
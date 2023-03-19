import { WebSocketState } from './Reducers/webSocket/types';
import {IBoardState} from "./Reducers/board/types";
import {IUserState} from "./Reducers/user/types";


export interface AppState {
    webSocket: WebSocketState
    board: IBoardState
    user: IUserState
}
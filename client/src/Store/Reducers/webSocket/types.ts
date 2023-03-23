import { typeConnect } from "../../../types/typeConnect";
import {Socket} from "socket.io-client";

export interface WebSocketState {
    socket: Socket | null
    connect: typeConnect
}
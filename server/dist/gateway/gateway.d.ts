import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { ObjectId } from "mongoose";
import { ColumnService } from "../column/column.service";
export declare class BoardGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private columnService;
    constructor(columnService: ColumnService);
    server: Server;
    handleSendMessage(client: Socket, payload: ObjectId): Promise<void>;
    handleChangeColumnName(client: Socket, payload: {
        columnName: string;
        columnId: ObjectId;
    }): Promise<void>;
    afterInit(server: Server): void;
    handleDisconnect(client: Socket): void;
    handleConnection(client: Socket, ...args: any[]): void;
}

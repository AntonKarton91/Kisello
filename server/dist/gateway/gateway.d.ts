import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { ObjectId } from "mongoose";
import { ColumnService } from "../column/column.service";
import { CardService } from "../card/card.service";
export declare class BoardGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private columnService;
    private cardService;
    constructor(columnService: ColumnService, cardService: CardService);
    server: Server;
    handleSendMessage(client: Socket, payload: ObjectId): Promise<void>;
    handleChangeColumnName(client: Socket, payload: {
        data: any;
        columnId: ObjectId;
    }): Promise<void>;
    handleAddCardToColumn(client: Socket, payload: {
        data: any;
        columnId: ObjectId;
    }): Promise<void>;
    handleCardUpload(client: Socket, payload: {
        data: any;
        cardId: ObjectId;
    }): Promise<void>;
    afterInit(server: Server): void;
    handleDisconnect(client: Socket): void;
    handleConnection(client: Socket, ...args: any[]): void;
}

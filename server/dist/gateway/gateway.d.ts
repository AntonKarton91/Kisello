import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { ObjectId } from "mongoose";
import { ColumnService } from "../column/column.service";
import { CardService } from "../card/card.service";
import { CreateCardCommentDto } from "../cardComment/dto/createCardComment.dto";
import { CardCommentService } from "../cardComment/cardComment.service";
export declare class BoardGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private columnService;
    private commentService;
    private cardService;
    constructor(columnService: ColumnService, commentService: CardCommentService, cardService: CardService);
    server: Server;
    handleSendMessage(client: Socket, payload: ObjectId): Promise<void>;
    handleChangeColumnName(client: Socket, payload: {
        data: any;
        columnId: ObjectId;
    }): Promise<void>;
    handleAddCardToColumn(client: Socket, payload: {
        title: string;
        boardId: string;
        columnId: ObjectId;
    }): Promise<void>;
    handleCardUpload(client: Socket, payload: {
        data: any;
        cardId: ObjectId;
    }): Promise<void>;
    addComment(client: Socket, payload: CreateCardCommentDto): Promise<void>;
    deleteComment(client: Socket, payload: string): Promise<void>;
    afterInit(server: Server): void;
    handleDisconnect(client: Socket): void;
    handleConnection(client: Socket, ...args: any[]): void;
}

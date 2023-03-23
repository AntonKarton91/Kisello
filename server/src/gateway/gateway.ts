import {
    OnGatewayConnection, OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io"
import { ObjectId } from "mongoose";
import { ColumnService } from "../column/column.service";


@WebSocketGateway({ cors: true })
export class BoardGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
    constructor(private columnService: ColumnService) {
    }

    @WebSocketServer() server: Server;

    @SubscribeMessage('addNewColumn')
    async handleSendMessage(client: Socket, payload: ObjectId): Promise<void> {
        const newColumn = await this.columnService.create(payload)
        this.server.emit('addNewColumn', newColumn);
    }

    @SubscribeMessage('columnUpdate')
    async handleChangeColumnName(client: Socket, payload: {data: any, columnId:ObjectId}): Promise<void> {
        await this.columnService.getAndUpdate(payload.columnId, payload.data)
        this.server.emit('columnUpdate', payload);
    }

    afterInit(server: Server) {
        console.log(server);
    }

    handleDisconnect(client: Socket) {
        console.log(`Disconnected: ${client.id}`);
        //Выполняем действия
    }

    handleConnection(client: Socket, ...args: any[]) {
        console.log(`Connected ${client.id}`);
        //Выполняем действия
    }
}
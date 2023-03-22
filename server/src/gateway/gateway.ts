import {
    MessageBody,
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
    //
    // @WebSocketServer()
    // server: Server
    //
    // onModuleInit(): any {
    //     this.server.on("connection", (socket)=> {
    //         console.log(socket.id)
    //         this.server.emit("add1Column", {
    //             msg: "Hello"
    //         })
    //     })
    //
    // }
    //
    // @SubscribeMessage("newColumn")
    // onNewColumn(@MessageBody() body: any) {
    //     console.log(111)
    //     this.server.emit("addColumn", {
    //         msg: "Hello"
    //     })
    // }

    @WebSocketServer() server: Server;

    @SubscribeMessage('addNewColumn')
    async handleSendMessage(client: Socket, payload: ObjectId): Promise<void> {
        const newColumn = await this.columnService.create(payload)
        this.server.emit('addNewColumn', newColumn);
    }

    @SubscribeMessage('changeColumnName')
    async handleChangeColumnName(client: Socket, payload: {columnName: string, columnId:ObjectId}): Promise<void> {
        try {
            await this.columnService.getByBoardIdAndRename(payload.columnId, payload.columnName)
            this.server.emit('changeColumnName', payload);
        } catch (e) {
            this.server.emit('changeColumnName', "error");
        }

    }

    afterInit(server: Server) {
        console.log(server);
        //Выполняем действия
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
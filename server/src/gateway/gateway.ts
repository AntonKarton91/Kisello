import {
    MessageBody,
    OnGatewayConnection, OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io"
import {OnModuleInit} from "@nestjs/common";
import {CreateColumnDto} from "../column/dto/createColumn.dto";


@WebSocketGateway({ cors: true })
export class BoardGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
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
    async handleSendMessage(client: Socket, payload: CreateColumnDto): Promise<void> {
        console.log(payload)
        this.server.emit('addNewColumn', payload);
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
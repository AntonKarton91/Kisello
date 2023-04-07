import {
  OnGatewayConnection, OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { ObjectId } from "mongoose";
import { ColumnService } from "../column/column.service";
import { CardService } from "../card/card.service";
import { CreateCardCommentDto } from "../cardComment/dto/createCardComment.dto";
import { CardCommentService } from "../cardComment/cardComment.service";


@WebSocketGateway({ cors: true })
export class BoardGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private columnService: ColumnService,
    private commentService: CardCommentService,
    private cardService: CardService
  ) {
  }

  @WebSocketServer() server: Server;

  @SubscribeMessage("addNewColumn")
  async handleSendMessage(client: Socket, payload: ObjectId): Promise<void> {
    const newColumn = await this.columnService.create(payload);
    this.server.emit("addNewColumn", newColumn);
  }

  @SubscribeMessage("columnUpdate")
  async handleChangeColumnName(client: Socket, payload: { data: any, columnId: ObjectId }): Promise<void> {
    await this.columnService.getAndUpdate(payload.columnId, payload.data);
    this.server.emit("columnUpdate", payload);
  }

  @SubscribeMessage("sendAddCardToColumn")
  async handleAddCardToColumn(client: Socket, payload: {
                                                        title: string,
                                                        boardId: string,
                                                        columnId: ObjectId
                                                      }): Promise<void> {
    const newCard = await this.cardService.create(payload);
    this.server.emit("addCardToColumn", newCard);
  }

  @SubscribeMessage("sendCardUpdate")
  async handleCardUpload(client: Socket, payload: { data: any, cardId: ObjectId }): Promise<void> {
    await this.cardService.getAndUpdate(payload.cardId, payload.data);
    this.server.emit("cardUpdate", payload);
  }

  @SubscribeMessage("sendAddComment")
  async addComment(client: Socket, payload: CreateCardCommentDto): Promise<void> {
    const newComment = await this.commentService.create(payload);
    this.server.emit("addComment", newComment);
  }

  @SubscribeMessage("sendDeleteComment")
  async deleteComment(client: Socket, payload: string): Promise<void> {
    const deletedComment = await this.commentService.delete(payload);
    this.server.emit("deleteComment", deletedComment);
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
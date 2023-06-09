"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const column_service_1 = require("../column/column.service");
const card_service_1 = require("../card/card.service");
const createCardComment_dto_1 = require("../cardComment/dto/createCardComment.dto");
const cardComment_service_1 = require("../cardComment/cardComment.service");
let BoardGateway = class BoardGateway {
    constructor(columnService, commentService, cardService) {
        this.columnService = columnService;
        this.commentService = commentService;
        this.cardService = cardService;
    }
    async handleSendMessage(client, payload) {
        const newColumn = await this.columnService.create(payload);
        this.server.emit("addNewColumn", newColumn);
    }
    async handleChangeColumnName(client, payload) {
        await this.columnService.getAndUpdate(payload.columnId, payload.data);
        this.server.emit("columnUpdate", payload);
    }
    async handleAddCardToColumn(client, payload) {
        const newCard = await this.cardService.create(payload);
        this.server.emit("addCardToColumn", newCard);
    }
    async handleCardUpload(client, payload) {
        await this.cardService.getAndUpdate(payload.cardId, payload.data);
        this.server.emit("cardUpdate", payload);
    }
    async addComment(client, payload) {
        const newComment = await this.commentService.create(payload);
        this.server.emit("addComment", newComment);
    }
    async deleteComment(client, payload) {
        const deletedComment = await this.commentService.delete(payload);
        this.server.emit("deleteComment", deletedComment);
    }
    async DNDCard(client, payload) {
        const response = await this.columnService.dndCard(payload);
        !!response
            ? this.server.emit("DNDCard", payload)
            : this.server.emit("DNDCard", false);
    }
    afterInit(server) {
        console.log(server);
    }
    handleDisconnect(client) {
        console.log(`Disconnected: ${client.id}`);
    }
    handleConnection(client, ...args) {
        console.log(`Connected ${client.id}`);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], BoardGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)("addNewColumn"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], BoardGateway.prototype, "handleSendMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("columnUpdate"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], BoardGateway.prototype, "handleChangeColumnName", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("sendAddCardToColumn"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], BoardGateway.prototype, "handleAddCardToColumn", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("sendCardUpdate"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], BoardGateway.prototype, "handleCardUpload", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("sendAddComment"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, createCardComment_dto_1.CreateCardCommentDto]),
    __metadata("design:returntype", Promise)
], BoardGateway.prototype, "addComment", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("sendDeleteComment"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", Promise)
], BoardGateway.prototype, "deleteComment", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("sendDNDCard"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], BoardGateway.prototype, "DNDCard", null);
BoardGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true }),
    __metadata("design:paramtypes", [column_service_1.ColumnService,
        cardComment_service_1.CardCommentService,
        card_service_1.CardService])
], BoardGateway);
exports.BoardGateway = BoardGateway;
//# sourceMappingURL=gateway.js.map
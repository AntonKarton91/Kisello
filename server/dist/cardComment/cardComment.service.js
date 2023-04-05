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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardCommentService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const cardComment_schema_1 = require("./schemas/cardComment.schema");
const column_service_1 = require("../column/column.service");
let CardCommentService = class CardCommentService {
    constructor(columnService, commentModel) {
        this.columnService = columnService;
        this.commentModel = commentModel;
    }
    async getByCardId(cardId) {
        const comments = await this.commentModel.find({ cardId });
        if (comments) {
            return {
                comments,
                cardId
            };
        }
    }
    async create(data) {
        const newComment = await this.commentModel.create(Object.assign(Object.assign({}, data), { createdAt: new Date() }));
        if (!newComment) {
            throw new common_1.HttpException("Ошибка сервера", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return {
            _id: newComment._id,
            body: newComment.body,
            userId: newComment.userId,
            createdAt: newComment.createdAt,
            cardId: newComment.cardId,
        };
    }
    async delete(data) {
        const deletedComment = await this.commentModel.findByIdAndDelete(data);
        if (!deletedComment) {
            throw new common_1.HttpException("Ошибка сервера", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return {
            _id: deletedComment._id,
            body: deletedComment.body,
            userId: deletedComment.userId,
            createdAt: deletedComment.createdAt,
            cardId: deletedComment.cardId,
        };
    }
};
CardCommentService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(cardComment_schema_1.CardComment.name)),
    __metadata("design:paramtypes", [column_service_1.ColumnService,
        mongoose_2.Model])
], CardCommentService);
exports.CardCommentService = CardCommentService;
//# sourceMappingURL=cardComment.service.js.map
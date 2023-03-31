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
exports.CardService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const card_schema_1 = require("./schemas/card.schema");
const column_service_1 = require("../column/column.service");
let CardService = class CardService {
    constructor(columnService, cardModel) {
        this.columnService = columnService;
        this.cardModel = cardModel;
    }
    async getByBoardId(id) {
        return this.cardModel.find({ boardId: id });
    }
    async create(data) {
        const newCard = await this.cardModel.create({
            title: data.title,
            boardId: data.boardId
        });
        if (!newCard) {
            throw new common_1.HttpException("Ошибка сервера", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        const cardId = newCard._id;
        await this.columnService.findAndAddCard(data.columnId, { $push: { cardList: cardId } });
        return {
            data: {
                _id: newCard._id,
                title: newCard.title,
                tagList: newCard.tagList,
                date: newCard.date,
                participants: newCard.participants,
                completed: false,
            },
            columnId: data.columnId
        };
    }
    async getAndUpdate(id, data) {
        try {
            return this.cardModel.findOneAndUpdate({ _id: id }, data, { new: true });
        }
        catch (e) {
            throw new Error(e);
        }
    }
};
CardService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(card_schema_1.Card.name)),
    __metadata("design:paramtypes", [column_service_1.ColumnService,
        mongoose_2.Model])
], CardService);
exports.CardService = CardService;
//# sourceMappingURL=card.service.js.map
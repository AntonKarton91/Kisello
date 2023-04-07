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
exports.ColumnService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const column_schema_1 = require("./schemas/column.schema");
const board_service_1 = require("../board/board.service");
let ColumnService = class ColumnService {
    constructor(boardService, columnModel) {
        this.boardService = boardService;
        this.columnModel = columnModel;
    }
    async findAll() {
        return this.columnModel.find();
    }
    async getByBoardId(id) {
        return this.columnModel.find({ board: id }).select("id name cardList");
    }
    async getAndUpdate(id, data) {
        try {
            return this.columnModel.findOneAndUpdate({ _id: id }, data, { new: true });
        }
        catch (e) {
            throw new Error(e);
        }
    }
    async create(boardId) {
        const newColumn = await this.columnModel.create({
            board: boardId,
            cardList: [],
        });
        if (!newColumn) {
            throw new common_1.HttpException("Ошибка сервера", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        await this.boardService.findAndUpdate(boardId, { $push: { columns: newColumn.id } });
        return {
            _id: newColumn.id,
            name: newColumn.name,
            cardList: newColumn.cardList
        };
    }
    async findAndAddCard(id, update) {
        return this.columnModel.findOneAndUpdate({ _id: id }, update);
    }
};
ColumnService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(column_schema_1.Column.name)),
    __metadata("design:paramtypes", [board_service_1.BoardService,
        mongoose_2.Model])
], ColumnService);
exports.ColumnService = ColumnService;
//# sourceMappingURL=column.service.js.map
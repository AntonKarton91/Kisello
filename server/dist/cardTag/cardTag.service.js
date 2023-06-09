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
exports.CardTagService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const board_service_1 = require("../board/board.service");
const cardTag_schema_1 = require("./schemas/cardTag.schema");
let CardTagService = class CardTagService {
    constructor(boardService, cardTagModel) {
        this.boardService = boardService;
        this.cardTagModel = cardTagModel;
    }
    async create(dto) {
        const newTag = await this.cardTagModel.create(Object.assign({}, dto));
        if (!newTag) {
            throw new common_1.HttpException("Ошибка сервера", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        await this.boardService.findAndUpdate(dto.boardId, { $push: { cardTags: newTag.id } });
        return newTag;
    }
    async getByBoardId(id) {
        return this.cardTagModel.find({ boardId: id });
    }
};
CardTagService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(cardTag_schema_1.CardTag.name)),
    __metadata("design:paramtypes", [board_service_1.BoardService,
        mongoose_2.Model])
], CardTagService);
exports.CardTagService = CardTagService;
//# sourceMappingURL=cardTag.service.js.map
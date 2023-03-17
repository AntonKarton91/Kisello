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
exports.BoardService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const board_schema_1 = require("./schemas/board.schema");
const user_service_1 = require("../user/user.service");
let BoardService = class BoardService {
    constructor(userService, boardModel) {
        this.userService = userService;
        this.boardModel = boardModel;
    }
    async create(dto) {
        const newBoard = await this.boardModel.create(Object.assign(Object.assign({}, dto), { cardTags: [], columns: [] }));
        newBoard.users.push(dto.userId);
        await newBoard.save();
        if (!newBoard) {
            throw new common_1.HttpException("Ошибка сервера", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        await this.userService.findAndUpdate(dto.userId, { $push: { boards: newBoard.id } });
        return newBoard;
    }
    async findAndUpdate(id, update) {
        return this.boardModel.findOneAndUpdate({ id }, update);
    }
};
BoardService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(board_schema_1.Board.name)),
    __metadata("design:paramtypes", [user_service_1.UserService,
        mongoose_2.Model])
], BoardService);
exports.BoardService = BoardService;
//# sourceMappingURL=board.service.js.map
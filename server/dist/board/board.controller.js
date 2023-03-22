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
exports.BoardController = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const board_service_1 = require("./board.service");
const createBoard_dto_1 = require("./dto/createBoard.dto");
let BoardController = class BoardController {
    constructor(configService, boardService) {
        this.configService = configService;
        this.boardService = boardService;
    }
    createProduct(dto) {
        return this.boardService.create(dto);
    }
    fetchBoardList(userId) {
        return this.boardService.getBoardList(userId.userId);
    }
    async findExtraData(params) {
        return await this.boardService.findById(params.id);
    }
};
__decorate([
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createBoard_dto_1.CreateBoardDto]),
    __metadata("design:returntype", void 0)
], BoardController.prototype, "createProduct", null);
__decorate([
    (0, common_1.Post)('/fetchboardlist'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BoardController.prototype, "fetchBoardList", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BoardController.prototype, "findExtraData", null);
BoardController = __decorate([
    (0, common_1.Controller)('board'),
    __metadata("design:paramtypes", [config_1.ConfigService,
        board_service_1.BoardService])
], BoardController);
exports.BoardController = BoardController;
//# sourceMappingURL=board.controller.js.map
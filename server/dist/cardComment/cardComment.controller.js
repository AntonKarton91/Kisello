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
exports.CardCommentController = void 0;
const common_1 = require("@nestjs/common");
const cardComment_service_1 = require("./cardComment.service");
const createCardComment_dto_1 = require("./dto/createCardComment.dto");
let CardCommentController = class CardCommentController {
    constructor(commentService) {
        this.commentService = commentService;
    }
    getAllCards({ cardId }) {
        return this.commentService.getByCardId(cardId);
    }
    createComment(dto) {
        return this.commentService.create(dto);
    }
};
__decorate([
    (0, common_1.Post)("/getbycardid"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CardCommentController.prototype, "getAllCards", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createCardComment_dto_1.CreateCardCommentDto]),
    __metadata("design:returntype", void 0)
], CardCommentController.prototype, "createComment", null);
CardCommentController = __decorate([
    (0, common_1.Controller)('comment'),
    __metadata("design:paramtypes", [cardComment_service_1.CardCommentService])
], CardCommentController);
exports.CardCommentController = CardCommentController;
//# sourceMappingURL=cardComment.controller.js.map
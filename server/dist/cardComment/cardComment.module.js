"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardCommentModule = void 0;
const common_1 = require("@nestjs/common");
const cardComment_controller_1 = require("./cardComment.controller");
const cardComment_service_1 = require("./cardComment.service");
const mongoose_1 = require("@nestjs/mongoose");
const cardComment_schema_1 = require("./schemas/cardComment.schema");
const column_module_1 = require("../column/column.module");
let CardCommentModule = class CardCommentModule {
};
CardCommentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: cardComment_schema_1.CardComment.name, schema: cardComment_schema_1.CardCommentSchema }]),
            column_module_1.ColumnModule,
        ],
        controllers: [cardComment_controller_1.CardCommentController],
        providers: [cardComment_service_1.CardCommentService],
        exports: [
            cardComment_service_1.CardCommentService,
        ]
    })
], CardCommentModule);
exports.CardCommentModule = CardCommentModule;
//# sourceMappingURL=cardComment.module.js.map
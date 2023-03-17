"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardTagModule = void 0;
const common_1 = require("@nestjs/common");
const cardTag_controller_1 = require("./cardTag.controller");
const cardTag_service_1 = require("./cardTag.service");
const mongoose_1 = require("@nestjs/mongoose");
const cardTag_schema_1 = require("./schemas/cardTag.schema");
const board_module_1 = require("../board/board.module");
let CardTagModule = class CardTagModule {
};
CardTagModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: cardTag_schema_1.CardTag.name, schema: cardTag_schema_1.CardTagSchema }]),
            board_module_1.BoardModule,
        ],
        controllers: [cardTag_controller_1.CardTagController],
        providers: [cardTag_service_1.CardTagService],
        exports: [
            cardTag_service_1.CardTagService,
        ]
    })
], CardTagModule);
exports.CardTagModule = CardTagModule;
//# sourceMappingURL=cardTag.module.js.map
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { CardService } from "./card.service";
import { CreateCardDto } from "./dto/createCard.dto";
export declare class CardController {
    private cardService;
    constructor(cardService: CardService);
    getAllCards({ boardId }: {
        boardId: any;
    }): Promise<(import("mongoose").Document<unknown, any, import("./schemas/card.schema").Card> & Omit<import("./schemas/card.schema").Card & {
        _id: import("mongoose").Types.ObjectId;
    }, never> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    createColumn(dto: CreateCardDto): Promise<{
        data: {
            _id: import("mongoose").Types.ObjectId;
            title: string;
            tagList: import("mongoose").Schema.Types.ObjectId[];
            date: Date;
            participants: import("mongoose").Schema.Types.ObjectId[];
            completed: boolean;
        };
        columnId: any;
    }>;
}

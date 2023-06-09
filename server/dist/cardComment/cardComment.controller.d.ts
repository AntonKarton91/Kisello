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
import { CardCommentService } from "./cardComment.service";
import { CreateCardCommentDto } from "./dto/createCardComment.dto";
export declare class CardCommentController {
    private commentService;
    constructor(commentService: CardCommentService);
    getAllCards({ cardId }: {
        cardId: any;
    }): Promise<{
        comments: (import("mongoose").Document<unknown, any, import("./schemas/cardComment.schema").CardComment> & Omit<import("./schemas/cardComment.schema").CardComment & {
            _id: import("mongoose").Types.ObjectId;
        }, never> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
        cardId: import("mongoose").Schema.Types.ObjectId;
    }>;
    createComment(dto: CreateCardCommentDto): Promise<{
        _id: import("mongoose").Types.ObjectId;
        body: string;
        userId: import("mongoose").Schema.Types.ObjectId;
        createdAt: Date;
        cardId: import("mongoose").Schema.Types.ObjectId;
    }>;
}

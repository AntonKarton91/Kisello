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
/// <reference types="mongoose/types/inferschematype" />
import { Model, ObjectId } from 'mongoose';
import { CardComment, CardCommentDocument } from "./schemas/cardComment.schema";
import { ColumnService } from "../column/column.service";
export declare class CardCommentService {
    private columnService;
    private commentModel;
    constructor(columnService: ColumnService, commentModel: Model<CardCommentDocument>);
    getByCardId(cardId: ObjectId): Promise<{
        comments: (import("mongoose").Document<unknown, any, CardComment> & Omit<CardComment & {
            _id: import("mongoose").Types.ObjectId;
        }, never> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
        cardId: import("mongoose").Schema.Types.ObjectId;
    }>;
    create(data: any): Promise<{
        _id: import("mongoose").Types.ObjectId;
        body: string;
        userId: import("mongoose").Schema.Types.ObjectId;
        createdAt: Date;
        cardId: import("mongoose").Schema.Types.ObjectId;
    }>;
    delete(data: any): Promise<{
        _id: import("mongoose").Types.ObjectId;
        body: string;
        userId: import("mongoose").Schema.Types.ObjectId;
        createdAt: Date;
        cardId: import("mongoose").Schema.Types.ObjectId;
    }>;
}

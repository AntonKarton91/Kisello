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

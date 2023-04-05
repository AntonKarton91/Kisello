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

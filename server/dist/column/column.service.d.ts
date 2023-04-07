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
import { Column, ColumnDocument } from "./schemas/column.schema";
import { BoardService } from "../board/board.service";
export declare class ColumnService {
    private boardService;
    private columnModel;
    constructor(boardService: BoardService, columnModel: Model<ColumnDocument>);
    findAll(): Promise<Column[]>;
    getByBoardId(id: any): Promise<(import("mongoose").Document<unknown, any, Column> & Omit<Column & {
        _id: import("mongoose").Types.ObjectId;
    }, never> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    getAndUpdate(id: ObjectId, data: any): Promise<import("mongoose").Document<unknown, any, Column> & Omit<Column & {
        _id: import("mongoose").Types.ObjectId;
    }, never> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    create(boardId: any): Promise<{
        _id: any;
        name: string;
        cardList: import("mongoose").Schema.Types.ObjectId[];
    }>;
    findAndAddCard(id: ObjectId, update: any): Promise<import("mongoose").Document<unknown, any, Column> & Omit<Column & {
        _id: import("mongoose").Types.ObjectId;
    }, never> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
}

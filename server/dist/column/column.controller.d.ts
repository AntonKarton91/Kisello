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
import { ColumnService } from "./column.service";
import { CreateColumnDto } from "./dto/createColumn.dto";
export declare class ColumnController {
    private columnService;
    constructor(columnService: ColumnService);
    getAllColumns(): Promise<import("./schemas/column.schema").Column[]>;
    createColumn(dto: CreateColumnDto): Promise<{
        id: any;
        name: string;
        cardList: import("mongoose").Schema.Types.ObjectId[];
    }>;
    getByBoardId(id: string): Promise<(import("mongoose").Document<unknown, any, import("./schemas/column.schema").Column> & Omit<import("./schemas/column.schema").Column & {
        _id: import("mongoose").Types.ObjectId;
    }, never> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
}

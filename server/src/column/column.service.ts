import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model, ObjectId} from 'mongoose';
import {CreateColumnDto} from './dto/createColumn.dto';
import {Column, ColumnDocument} from "./schemas/column.schema";

import {BoardService} from "../board/board.service";

@Injectable()
export class ColumnService {
    constructor(
        private boardService: BoardService,
        @InjectModel(Column.name) private columnModel: Model<ColumnDocument>,
    ) {
    }

    async findAll(): Promise<Column[]> {
        return this.columnModel.find();
    }

    async create(dto: CreateColumnDto) {
        const newColumn = await this.columnModel.create({
            ...dto,
            cards: [],
        });
        if (!newColumn) {
            throw new HttpException("Ошибка сервера", HttpStatus.INTERNAL_SERVER_ERROR)
        }
        await this.boardService.findAndUpdate(dto.boardId, {$push: {columns: newColumn.id}})
        return newColumn
    }

}

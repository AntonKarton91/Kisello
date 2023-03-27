import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model, ObjectId} from 'mongoose';
import {CreateColumnDto} from './dto/createColumn.dto';
import {Column, ColumnDocument} from "./schemas/column.schema";

import {BoardService} from "../board/board.service";
import { Board } from "../board/schemas/board.schema";

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

    async getByBoardId(id){
        return this.columnModel.find({board: id}).select("id name cardList");
    }

    async getAndUpdate(id: ObjectId, data: any){
        try {
            return this.columnModel.findOneAndUpdate({_id: id}, data, {new: true})
        } catch (e) {
            throw new Error(e)
        }
    }

    async create(boardId) {
        const newColumn = await this.columnModel.create({
            board: boardId,
            cardList: [],
        });
        if (!newColumn) {
            throw new HttpException("Ошибка сервера", HttpStatus.INTERNAL_SERVER_ERROR)
        }
        await this.boardService.findAndUpdate(boardId, {$push: {columns: newColumn.id}})
        return {
            _id: newColumn.id,
            name: newColumn.name,
            cardList: newColumn.cardList
        }
    }

    async findAndAddCard(id: ObjectId, update): Promise<Board> {
        return this.columnModel.findOneAndUpdate({id}, update);
    }

}

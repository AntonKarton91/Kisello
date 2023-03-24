import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model, ObjectId} from 'mongoose';
import {CreateCardDto} from './dto/createCard.dto';
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

    async getByBoardId(id){
        return this.columnModel.find({board: id}).select("id name cardList");
    }

    async getAndUpdate(id: ObjectId, data: any){
        console.log(id, data)
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
            id: newColumn.id,
            name: newColumn.name,
            cardList: newColumn.cardList
        }
    }

}

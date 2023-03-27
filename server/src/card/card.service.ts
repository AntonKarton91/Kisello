import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model, ObjectId} from 'mongoose';
import {CreateCardDto} from './dto/createCard.dto';

import { Card, CardDocument } from "./schemas/card.schema";
import { ColumnService } from "../column/column.service";

@Injectable()
export class CardService {
    constructor(
        private columnService: ColumnService,
        @InjectModel(Card.name) private cardModel: Model<CardDocument>,
    ) {
    }

    async getByBoardId(id: ObjectId){
        return this.cardModel.find({boardId: id});
    }

    async create(data) {
        console.log(data);
        const newCard = await this.cardModel.create({
            title: data.title,
            boardId: data.boardId
        });
        if (!newCard) {
            throw new HttpException("Ошибка сервера", HttpStatus.INTERNAL_SERVER_ERROR)
        }
        const cardId = newCard._id
        await this.columnService.findAndAddCard(data.columnId, {$push: {cardList: cardId}})
        return {
            data: {
                _id: newCard._id,
                title: newCard.title,
                tagList: newCard.tagList,
                date: newCard.date,
                participants: newCard.participants,
                completed: false
            },
            columnId: data.columnId

        }
    }

    async getAndUpdate(id: ObjectId, data: any){
        try {
            return this.cardModel.findOneAndUpdate({_id: id}, data, {new: true})
        } catch (e) {
            throw new Error(e)
        }
    }

}

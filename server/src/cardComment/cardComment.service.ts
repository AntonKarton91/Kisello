import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model, ObjectId} from 'mongoose';

import { CardComment, CardCommentDocument } from "./schemas/cardComment.schema";
import { ColumnService } from "../column/column.service";

@Injectable()
export class CardCommentService {
    constructor(
        private columnService: ColumnService,
        @InjectModel(CardComment.name) private commentModel: Model<CardCommentDocument>,
    ) {
    }

    async getByCardId(cardId: ObjectId){
        const comments = await this.commentModel.find({cardId});
        if (comments) {
            return {
                comments,
                cardId
            }
        }
    }

    async create(data) {
        const newComment = await this.commentModel.create({...data, createdAt: new Date()});
        if (!newComment) {
            throw new HttpException("Ошибка сервера", HttpStatus.INTERNAL_SERVER_ERROR)
        }
        return {
                _id: newComment._id,
                body: newComment.body,
                userId: newComment.userId,
                createdAt: newComment.createdAt,
                cardId: newComment.cardId,
            }
    }

    async delete(data) {
        const deletedComment = await this.commentModel.findByIdAndDelete(data);
        if (!deletedComment) {
            throw new HttpException("Ошибка сервера", HttpStatus.INTERNAL_SERVER_ERROR)
        }
        return {
                _id: deletedComment._id,
                body: deletedComment.body,
                userId: deletedComment.userId,
                createdAt: deletedComment.createdAt,
                cardId: deletedComment.cardId,
            }
    }
}

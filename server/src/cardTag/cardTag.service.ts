import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model, Schema} from 'mongoose';
import {BoardService} from "../board/board.service";
import {CardTag, CardTagDocument} from "./schemas/cardTag.schema";
import {CreateCardTagDto} from "./dto/createCardTag.dto";

@Injectable()
export class CardTagService {
  constructor(
      private boardService: BoardService,
      @InjectModel(CardTag.name) private cardTagModel: Model<CardTagDocument>,
  ) {}

  async create(dto: CreateCardTagDto) {
    const newTag = await this.cardTagModel.create({
      ...dto,
    });
    if (!newTag) {
      throw new HttpException("Ошибка сервера", HttpStatus.INTERNAL_SERVER_ERROR)
    }
    await this.boardService.findAndUpdate(dto.boardId, {$push: {cardTags: newTag.id}})
    return newTag
  }
}

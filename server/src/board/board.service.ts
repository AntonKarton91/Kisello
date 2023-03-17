import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model, ObjectId} from 'mongoose';
import { CreateBoardDto } from './dto/createBoard.dto';
import {Board, BoardDocument} from "./schemas/board.schema";
import {UserService} from "../user/user.service";
import {User} from "../user/schemas/user.schema";

@Injectable()
export class BoardService {
  constructor(
      private userService: UserService,
    @InjectModel(Board.name) private boardModel: Model<BoardDocument>,
  ) {}

  async create(dto: CreateBoardDto) {
    const newBoard = await this.boardModel.create({
      ...dto,
      cardTags: [],
      columns: []
    });
    newBoard.users.push(dto.userId)
    await newBoard.save()
    if (!newBoard) {
      throw new HttpException("Ошибка сервера", HttpStatus.INTERNAL_SERVER_ERROR)
    }
    await this.userService.findAndUpdate(dto.userId, {$push: {boards: newBoard.id}})
    return newBoard
  }

  async findAndUpdate(id: ObjectId, update): Promise<Board> {
    return this.boardModel.findOneAndUpdate({id}, update);
  }
}

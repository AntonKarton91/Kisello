import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {BoardService} from "./board.service";
import {CreateBoardDto} from "./dto/createBoard.dto";
import {ObjectId} from "mongoose";

@Controller('board')
export class BoardController {
    constructor(
        private readonly configService: ConfigService,
        private boardService: BoardService
    ) {}

    @Post('/create')
    createProduct(@Body() dto: CreateBoardDto) {
        return this.boardService.create(dto)
    }

    @Post('/fetchboardlist')
    fetchBoardList(@Body() userId: {userId:ObjectId}) {
        return this.boardService.getBoardList(userId.userId)
    }

    @Get(':id')
    async findExtraData(@Param() params) {
        return await this.boardService.findById(params.id)
    }

}

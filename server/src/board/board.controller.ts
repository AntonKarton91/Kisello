import {Body, Controller, Post} from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {BoardService} from "./board.service";
import {CreateBoardDto} from "./dto/createBoard.dto";

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

}

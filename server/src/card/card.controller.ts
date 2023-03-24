import {Body, Controller, Get, Post} from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {ColumnService} from "./column.service";
import {CreateCardDto} from "./dto/createCard.dto";

@Controller('column')
export class ColumnController {
    constructor(
        private columnService: ColumnService
    ) {}

    @Get()
    getAllColumns() {
        return this.columnService.findAll()
    }

    @Post()
    createColumn(@Body() dto: CreateCardDto) {
        return this.columnService.create(dto)
    }

    @Post("/getbyboardid")
    async getByBoardId(@Body() id: string) {
        return this.columnService.getByBoardId(id)
    }
}

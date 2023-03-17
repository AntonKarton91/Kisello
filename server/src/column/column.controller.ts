import {Body, Controller, Get, Post} from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {ColumnService} from "./column.service";
import {CreateColumnDto} from "./dto/createColumn.dto";

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
    createColumn(@Body() dto: CreateColumnDto) {
        return this.columnService.create(dto)
    }


}

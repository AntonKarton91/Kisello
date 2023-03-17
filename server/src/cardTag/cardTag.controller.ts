import {Body, Controller, Post} from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {CardTagService} from "./cardTag.service";
import {CreateCardTagDto} from "./dto/createCardTag.dto";

@Controller('cardtag')
export class CardTagController {
    constructor(
        private cardTagService: CardTagService
    ) {}

    @Post('/create')
    createProduct(@Body() dto: CreateCardTagDto) {
        return this.cardTagService.create(dto)
    }

}

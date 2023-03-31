import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import {CardService} from "./card.service";
import {CreateCardDto} from "./dto/createCard.dto";
import { ObjectId } from "mongoose";

@Controller('card')
export class CardController {
    constructor(
        private cardService: CardService
    ) {}

    @Post("/getbyboardid")
    getAllCards(@Body() { boardId }) {
        return this.cardService.getByBoardId(boardId)
    }

    @Post()
    createColumn(@Body() dto: CreateCardDto) {
        return this.cardService.create(dto)
    }

}

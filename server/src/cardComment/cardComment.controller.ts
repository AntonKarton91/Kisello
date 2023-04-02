import { Body, Controller, Post } from "@nestjs/common";
import {CardCommentService} from "./cardComment.service";
import {CreateCardCommentDto} from "./dto/createCardComment.dto";

@Controller('comment')
export class CardCommentController {
    constructor(
        private commentService: CardCommentService
    ) {}

    @Post("/getbycardid")
    getAllCards(@Body() { cardId }) {
        return this.commentService.getByCardId(cardId)
    }

    @Post()
    createComment(@Body() dto: CreateCardCommentDto) {
        return this.commentService.create(dto)
    }

}

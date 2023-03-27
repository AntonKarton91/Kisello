import {Body, Controller, Get, Param, Post, Res} from '@nestjs/common';
import {UserService} from "./user.service";


@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post("/getbyboardid")
    getAllCards(@Body() { boardId }) {
        console.log(1);
        return this.userService.getByBoardId(boardId)
    }
}

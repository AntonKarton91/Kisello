import {Body, Controller, Get, Param, Post, Res} from '@nestjs/common';
import {UserService} from "./user.service";


@Controller('user')
export class UserController {
    constructor(private userService: UserService) {
    }

    @Get(':id')
    async findExtraData(@Param() params) {
        return await this.userService.getUserExtraData(params.id)
    }


}

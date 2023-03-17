import {CreateUserDto} from "./types";
import {$api} from "../index";


export const UserApi = {
    async registerUser(userData: Partial<CreateUserDto>): Promise<CreateUserDto> {
        const { data } = await $api.post(`/auth/register/`, userData)
        return data
    },
}

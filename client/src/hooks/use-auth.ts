import {useSelector} from 'react-redux';
import {useAppSelector} from "../Store/hooks";
import {TypeEmployerPosition} from "../models/models";

export function useAuth() {
    const { id, name, surname, email, avatar, boards, accessToken } = useAppSelector(state => state.user)
    const token = localStorage.getItem("accessToken")
    return {
        isAuth: !!token,
        id,
        name,
        surname,
        email,
        avatar,
        accessToken,
        boards,
    };
}
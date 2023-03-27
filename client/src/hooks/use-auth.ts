import {useAppDispatch, useAppSelector} from "../Store/hooks";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";
import {login} from "../Store/Reducers/user/userSlice";

export function useAuth() {
    const { id, name, surname, email, avatar, boards, token: accessToken } = useAppSelector(state => state.user)
    const token = localStorage.getItem("accessToken")
    const dispatch = useAppDispatch()
    let navigate = useNavigate();


    useEffect(()=> {
        async function getUser() {
            const { data } = await axios.post(process.env.REACT_APP_NEXT_PUBLIC_DOMAIN + "auth/getbytoken", {token})
                .catch(e=>{
                    if (e.response.status >= 400) {
                        localStorage.removeItem("accessToken")
                        return navigate("/login")
                    }
                    return e
                })
            dispatch(login({...data, accessToken: token}))
        }
        if (!accessToken) {
            if (token) {
                getUser()
            } else return navigate("/login")
        }
    }, [])
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
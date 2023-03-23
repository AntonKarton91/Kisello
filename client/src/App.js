import {BrowserRouter, Navigate, Route, Routes, useNavigate} from "react-router-dom";
import BoardPage from "@/Pages/BoardPage/board.page";
import {store} from "./Store/store";
import {Provider} from "react-redux";
import LoginPage from "./Pages/LoginPage/login.page";
import MainPage from "./Pages/MainPage/main.page";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "./Store/hooks";
import {fetchUserByToken} from "./Store/Reducers/user/thunks";
import {auth, login} from "./Store/Reducers/user/userSlice";
import axios from "axios";

function App() {
    const [loading, setLoading] = useState(false)

    const dispatch = useAppDispatch()
    let token = localStorage.getItem("accessToken")
    // token = true

    useEffect(()=>{
        const authentication = async () => {
            setLoading(true)
            if (token) {
                try {
                    console.log(token)
                    const { data } = await axios.post(process.env.REACT_APP_NEXT_PUBLIC_DOMAIN + "auth/getbytoken", {token})
                    await dispatch(login({...data, accessToken: token}))
                    setLoading(false)
                } catch (e) {

                }
                finally {
                    setLoading(false)
                }
            }
            setLoading(false)
        }
        authentication()
    }, [])

    if (loading) return <div></div>

    return (

            <BrowserRouter>
                <Routes>
                    <Route
                      path='/'
                      element={<MainPage/>}
                    />
                    <Route path='login' element={<LoginPage/>} />
                    <Route
                        path='/board/:id'
                        element={<BoardPage/>}
                    />
                </Routes>
            </BrowserRouter>
    );
}

export default App;

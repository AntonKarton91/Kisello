import {BrowserRouter, Navigate, Route, Routes, useNavigate} from "react-router-dom";
import BoardPage from "@/Pages/BoardPage/board.page";
import {store} from "./Store/store";
import {Provider} from "react-redux";
import LoginPage from "./Pages/LoginPage/login.page";
import MainPage from "./Pages/MainPage/main.page";
import {useEffect} from "react";
import {useAppDispatch} from "./Store/hooks";
import {fetchUserByToken} from "./Store/Reducers/user/thunks";

function App() {
    const dispatch = useAppDispatch()
    let token = localStorage.getItem("accessToken")
    // token = true

    useEffect(()=>{
        if (token) {
            dispatch(fetchUserByToken(token))
        }
    }, [])

    return (

            <BrowserRouter>
                <Routes>
                    <Route
                      path='/'
                      element={
                      !token
                          ? (<Navigate replace to="/login" />)
                          : (<MainPage/>)
                      }
                    />
                    <Route path='login' element={<LoginPage />} />
                    <Route
                        path='/board/:id'
                        element={
                            !token
                                ? (<Navigate replace to="/login" />)
                                : (<BoardPage/>)
                        }
                    />
                </Routes>
            </BrowserRouter>
    );
}

export default App;

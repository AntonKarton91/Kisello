import {BrowserRouter, Navigate, Route, Routes, useNavigate} from "react-router-dom";
import BoardPage from "@/Pages/BoardPage/board.page";
import {store} from "./Store/store";
import {Provider} from "react-redux";
import LoginPage from "./Pages/LoginPage/login.page";
import MainPage from "./Pages/MainPage/main.page";

function App() {
let token = localStorage.getItem("accessToken")
token = true

    return (
        <Provider store={store}>
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
                        path='/board'
                        element={
                            !token
                                ? (<Navigate replace to="/login" />)
                                : (<BoardPage/>)
                        }
                    />
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}

export default App;

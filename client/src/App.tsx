import React, {useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ThemeProvider} from "@mui/material";
import {theme} from "./styles/themes";
import MainPage from "./Pages/MainPage/main.page";
import LoginPage from "./Pages/LoginPage/login.page";
import BoardPage from "./Pages/BoardPage/board.page";






function App() {
    const [loading, setLoading] = useState(false)

    if (loading) return <div></div>

    return (

            <BrowserRouter>

                <ThemeProvider theme={theme}>
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
                </ThemeProvider>
            </BrowserRouter>
    );
}

export default App;

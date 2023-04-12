import React, {useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ThemeProvider} from "@mui/material";
import {theme} from "./styles/themes";
import MainPage from "./Pages/MainPage/main.page";
import LoginPage from "./Pages/LoginPage/login.page";
import BoardPage from "./Pages/BoardPage/board.page";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";






function App() {
    const [loading, setLoading] = useState(false)

    if (loading) return <div></div>

    return (
        <DndProvider backend={HTML5Backend}>
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
        </DndProvider>

    );
}

export default App;

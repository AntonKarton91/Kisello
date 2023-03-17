import {BrowserRouter, Route, Routes} from "react-router-dom";
import BoardPage from "@/Pages/BoardPage/board.page";
import {store} from "./Store/store";
import {Provider} from "react-redux";
import LoginPage from "./Pages/LoginPage/login.page";

function App() {
  return (
      <Provider store={store}>
          <BrowserRouter>
            <Routes>
              {/*<Route path='/' element={<LoginPage />} />*/}
              <Route path='login' element={<LoginPage />} />
              <Route path="/" element={<BoardPage />} />
            </Routes>
          </BrowserRouter>
      </Provider>
  );
}

export default App;

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './App';
import {store} from "./Store/store";
import {Provider} from "react-redux";

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//     <Provider store={store}>
//         <App />
//     </Provider>
//
// );
//

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root') as HTMLElement
);
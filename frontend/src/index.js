import {createContext} from 'react';
import * as React from "react";
import App from './App';
import UserStore from "./store/UserStore";
import ParkStore from "./store/ParkStore";
import  ReactDOM from 'react-dom/client';
import {createRoot} from 'react-dom/client';

export const Context = createContext(null)
// const APP_API_URL = process.env.REACT_APP_API_URL
// console.log(APP_API_URL);

// import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container); 
root.render( 
    <Context.Provider value={{
        user:new UserStore(),
        park: new ParkStore()
    }}>
        <App/>
    </Context.Provider> );

// );
// console.log(root)
//     <React.StrictMode value={{
//         user:new UserStore()
//     }}>
//     <App />,
//     </React.StrictMode>
//     );

// const Context=createContext(null)
// ReactDOM.render(
    

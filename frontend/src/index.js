import {createContext} from 'react';
import * as React from "react";
import App from './App';
import UserStore from "./store/UserStore";
import ParkStore from "./store/ParkStore";
import * as ReactDOM from 'react-dom/client';
import{createRoot} from 'react-dom/client';

export const Context = createContext(null)

// import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container); 
root.render(<App/>);
{/* <Context.Provider value={{
    user:new UserStore(),
    park: new ParkStore()
}}>*/
    
/*</Context.Provider> */}
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
    

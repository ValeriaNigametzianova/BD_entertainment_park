import React, {createContext} from 'react';
import App from './App';
import UserStore from "./store/UserStore";
import ParkStore from "./store/ParkStore";
import * as ReactDOMClient from 'react-dom/client';

export const Context = createContext(null)

// import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = ReactDOMClient.hydrateRoot(container); 
root.render(<Context.Provider value={{
    user:new UserStore(),
    park: new ParkStore()
}}>
    <App/>
</Context.Provider>,
document.getElementById('root')
);
//     <React.StrictMode value={{
//         user:new UserStore()
//     }}>
//     <App />,
//     </React.StrictMode>
//     );

// const Context=createContext(null)
// ReactDOM.render(
    

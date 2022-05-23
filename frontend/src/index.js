import React, {createContext} from 'react';
import App from './App';
import UserStore from "./store/UserStore";

import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <React.StrictMode value={{
        user:new UserStore()
    }}>
    <App />,
    </React.StrictMode>
    );
export const Context = createContext(null)

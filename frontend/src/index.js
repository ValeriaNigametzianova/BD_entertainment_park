import { createContext } from 'react'
import * as React from 'react'
import App from './App'
import UserStore from './store/UserStore'
import ParkStore from './store/ParkStore'
import ReactDOM from 'react-dom/client'
export const Context = createContext(null)
const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)
root.render(
  <Context.Provider
    value={{
      user: new UserStore(),
      park: new ParkStore(),
    }}
  >
    <App />
  </Context.Provider>
)

import {useContext, useEffect, useState} from "react";
import  React from "react";
import AppRouter from "./components/AppRouter";
import {BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar";
import {Spinner} from "react-bootstrap";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import {stuffCheck} from "./http/stuffAPI";
import {customerCheck} from "./http/customerAPI";
import "./styles/app/app.css"

const App = observer( () => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      stuffCheck().then(data => {
            user.setUser(true)
            user.setIsAuth(true)
        }).finally(() => setLoading(false))
    }, [])

    useEffect(() => {
      customerCheck().then(data => {
          user.setUser(true)
          user.setIsAuth(true)
      }).finally(() => setLoading(false))
  }, [])

    if (loading) {
        return <Spinner animation={"grow"} className={"text-light"}/>
    }
    return (
    <BrowserRouter>
      <NavBar />
      <AppRouter/> 
    </BrowserRouter>
  );
});

export default App;
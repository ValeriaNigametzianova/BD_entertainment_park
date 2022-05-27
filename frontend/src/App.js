import {useContext, useEffect, useState} from "react";
import * as React from "react";
import AppRouter from "./components/AppRouter";
import {BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar";
import {Spinner} from "react-bootstrap";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import {check} from "./http/customerAPI";
import "./styles/app/app.css"

const App = observer( () => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        check().then(data => {
            user.setUser(true)
            user.setIsAuth(true)
        }).finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <Spinner animation={"grow"}/>
    }
  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter/> 
    </BrowserRouter>
  );
});

export default App;
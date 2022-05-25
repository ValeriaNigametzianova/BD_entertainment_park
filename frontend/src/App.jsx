import React, {useContext, useEffect, useState} from "react";
import AppRouter from "./components/AppRouter";
import {BrowserRouter} from "react-router-dom";
import NavBar from "./components/NavBar";
import {Spinner} from "react-bootstrap";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import {check} from "./http/userAPI";
const App = observer(() => {
    const {user} = useContext(Context)
    console.log(user);
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
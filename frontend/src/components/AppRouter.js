import React, {useContext} from 'react';
import {Routes, Route, Redirect} from 'react-router-dom'
import {authRoutes, publicRoutes} from "../Routes";
import {MAIN_ROUTE} from "../utils/Consts";
import {Context} from "../index";
import Main from "../pages/Main"

const AppRouter = () => {
    const {user} = useContext(Context)

    console.log(user)
    return (
        <Routes>
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={Component} exact/>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={Component} exact/>
            )}
            {/* <Redirect to={MAIN_ROUTE}/> */}
            <Route path="/" element={<Main/>}/>
        </Routes>
    );
};

export default AppRouter;
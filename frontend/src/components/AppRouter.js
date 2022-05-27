import * as React from 'react';
import {useContext}  from 'react'
import {Routes, Route, Redirect, Navigate} from 'react-router-dom'
import {authRoutes, publicRoutes} from "../Routes";
import {MAIN_ROUTE} from "../utils/Consts";
import {Context} from "../index";
import Main from "../pages/Main"
import { observer } from 'mobx-react-lite';

const AppRouter = observer(() => {
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
            {/* <Route path="/" element={<Main/>}/> */}
            <Route path="*" element={<Main/>}/>
        </Routes>
    );
});

export default AppRouter;
import React, {useContext} from 'react';
import {Router, Route, Navigate} from 'react-router-dom'
import {authRoutes, publicRoutes} from "../Routes";
import {MAIN_ROUTE} from "../utils/Consts";
import {Context} from "../index";

const AppRouter = () => {
    const {user} = useContext(Context)

    console.log(user)
    return (
        <Router>
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            <Navigate to={MAIN_ROUTE}/>
        </Router>
    );
};

export default AppRouter;
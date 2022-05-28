import React, {useContext} from 'react';
// import {Routes, Route, Redirect} from 'react-router-dom'
// import {authRoutes, publicRoutes} from "../Routes";
// import {MAIN_ROUTE} from "../utils/Consts";
import {Context} from "../index";
// import Main from "../pages/Main"
import {Row} from 'react-bootstrap'
import TarifItem from "../components/TarifItem"
import { observer } from 'mobx-react-lite';

const TarifList = observer(() => {
    const {tarif} = useContext(Context)
    // const ParkId = park.id

    return (
        <Row className="d-flex">
            {tarif.tarif.map(tarif =>
                <TarifItem key={tarif.id} tarif = {tarif}/>
            )}
        </Row>
    );
});

export default TarifList;
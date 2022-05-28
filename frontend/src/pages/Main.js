import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {customerFetchPark, fetchBrands, fetchPark, fetchTypes} from "../http/parkAPI";
import {Col, Container, Navbar, Row} from "react-bootstrap";
import {Context} from "../index";
// import ParkMain from './Park_main';
import {useNavigate , useLocation} from "react-router-dom";
import ParkList from '../components/ParkList'

const Main = observer(() => {
    const {park} = useContext(Context)

    useEffect(() => {
        customerFetchPark().then(data => park.setPark(data.rows))
    }, [])

    // useEffect(() => {
    //     fetchPark(park.selectedType.id, park.selectedBrand.id, park.page, 2).then(data => {
    //         park.setDevices(data.rows)
    //         park.setTotalCount(data.count)
    //     })
    // }, [park.page, park.selectedType, park.selectedBrand,])

    return (
        <Container>
            <Row className="mt-9">
                <Col >
                    <ParkList/>
                </Col>
            </Row>
        </Container>
    );
});

export default Main;
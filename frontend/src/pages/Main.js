import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {fetchBrands, fetchDevices, fetchTypes} from "../http/parkAPI";
import {Col, Container, Row} from "react-bootstrap";
import {Context} from "../index";

const Main = observer(() => {
    const {park} = useContext(Context)

    useEffect(() => {
        fetchTypes().then(data => park.setTypes(data))
        fetchBrands().then(data => park.setBrands(data))
        fetchDevices(null, null, 1, 2).then(data => {
            park.setDevices(data.rows)
            park.setTotalCount(data.count)
        })
    }, [])

    useEffect(() => {
        fetchDevices(park.selectedType.id, park.selectedBrand.id, device.page, 2).then(data => {
            park.setDevices(data.rows)
            park.setTotalCount(data.count)
        })
    }, [park.page, park.selectedType, park.selectedBrand,])

    return (
        <Container>
            <Row className="mt-2">
                <Col md={9}>
                    <BrandBar/>
                    <DeviceList/>
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );
});

export default Main;
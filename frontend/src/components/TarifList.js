import React, { useContext, useEffect, useState } from 'react'
// import {Routes, Route, Redirect} from 'react-router-dom'
// import {authRoutes, publicRoutes} from "../Routes";
// import {MAIN_ROUTE} from "../utils/Consts";
import { Context } from '../index'
// import Main from "../pages/Main"
import { Row } from 'react-bootstrap'
import TarifItem from '../components/TarifItem'
import { observer } from 'mobx-react-lite'
import { stuffFetchPark, stuffFetchTarif } from '../http/parkAPI'
import { useParams } from 'react-router-dom'

const TarifList = () => {
  const [park, setPark] = useState()
  const [tarif, setTarif] = useState()
  const { id } = useParams()
  useEffect(() => {
    stuffFetchPark().then((data) => setPark(data.park))
    stuffFetchTarif().then((data) => setTarif(data))
  }, [])

  return (
    <Row className="d-flex">
      {tarif.tarif.map((tarif) => (
        <TarifItem key={tarif.id} tarif={tarif} />
      ))}
    </Row>
  )
}

export default TarifList

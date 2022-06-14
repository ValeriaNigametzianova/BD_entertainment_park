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
  const [tarifs, setTarifs] = useState()
  const { id } = useParams()
  useEffect(() => {
    stuffFetchPark().then((data) => setPark(data.park))
    stuffFetchTarif().then((data) => setTarifs(data.tarifs))
  }, [])

  return (
    <Row className="d-flex">
      {console.log('tarif.id', tarifs)}
      {tarifs &&
        tarifs.map((el) =>
          el.map((tarif) => <TarifItem key={tarif.id} tarif={tarif} />)
        )}
    </Row>
  )
}

export default TarifList

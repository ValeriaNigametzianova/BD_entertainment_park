import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import { Context } from '../index'
import TarifItem from './TarifItem'
import { stuffFetchPark, stuffFetchTarif } from '../http/parkAPI'

const TarifList = observer(() => {
  // const [park, setPark] = useState()
  const { park } = useContext(Context)
  // const [tarifs, setTarifs] = useState()
  useEffect(() => {
    // stuffFetchPark().then((data) => setPark(data.park))
    // stuffFetchTarif().then((data) => setTarifs(data.tarifs))

    stuffFetchTarif().then((data) => park.setTarif(data.tarifs))
  }, [])

  return (
    <Row>{park.tarifs && park.tarifs.map((el) => el.map((tarif) => <TarifItem key={tarif.id} tarif={tarif} />))}</Row>
  )
})

export default TarifList

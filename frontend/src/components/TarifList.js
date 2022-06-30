import React, { useContext, useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import TarifItem from '../components/TarifItem'
import { stuffFetchPark, stuffFetchTarif } from '../http/parkAPI'

const TarifList = () => {
  const [park, setPark] = useState()
  const [tarifs, setTarifs] = useState()
  useEffect(() => {
    stuffFetchPark().then((data) => setPark(data.park))
    stuffFetchTarif().then((data) => setTarifs(data.tarifs))
  }, [])

  return (
    <Row>
      {tarifs &&
        tarifs.map((el) =>
          el.map((tarif) => <TarifItem key={tarif.id} tarif={tarif} />)
        )}
    </Row>
  )
}

export default TarifList

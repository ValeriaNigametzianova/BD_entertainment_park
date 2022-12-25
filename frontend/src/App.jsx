import { useContext, useEffect, useState } from 'react'
import React from 'react'
import AppRouter from './components/AppRouter'
import { BrowserRouter } from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import { Spinner } from 'react-bootstrap'
import { Context } from './index'
import { observer } from 'mobx-react-lite'
import { stuffCheck } from './http/stuffAPI'
import { customerCheck } from './http/customerAPI'
import './styles/app/app.css'
import { useCallback } from 'react'
import DialogWindow from './components/DialogWindow'
import { customerFetchPark } from './http/parkAPI'

const App = observer(() => {
  const { user } = useContext(Context)
  const { park } = useContext(Context)
  const [isLoading, setIsLoading] = useState(true)

  // //считает ширину окна без прокрутки
  // const setWidthPage = useCallback(() => {
  //   let widthClient = window.innerWidth - document.documentElement.clientWidth
  //   // setWidthClient(window.innerWidth - document.documentElement.clientWidth)
  //   if (widthClient == 0) {
  //     document.getElementById('root').style['padding-right'] = 0
  //   }
  //   return widthClient
  // }, [window.innerWidth, document.documentElement.clientWidth])

  const timeout = useCallback(() => {
    if (park.visible) {
      const timeId = setTimeout(() => {
        park.setVisible(false)
      }, 1500)
      return () => {
        clearTimeout(timeId)
      }
    }
  }, [park.visible])

  useEffect(() => {
    console.log(park)
    timeout()
  }, [timeout])

  useEffect(() => {
    stuffCheck()
      .then((data) => {
        user.setUser(data)
        user.setIsAuth(true)
        user.setRole(data.role)
      })
      .finally(() => setIsLoading(false))
  }, [])
  useEffect(() => {
    customerCheck()
      .then((data) => {
        user.setUser(data)
        user.setIsAuth(true)
        user.setRole(data.role)
      })
      .finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    setIsLoading(true)
    customerFetchPark(park.searchQuery, park.selectedTown, park.page, 3)
      .then((data) => {
        park.setTown(data.towns)
      })
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <BrowserRouter>
      {isLoading ? (
        <Spinner animation={'border'} className={'text-light'} />
      ) : (
        <div className="app">
          {park.visible && <DialogWindow></DialogWindow>}
          <NavBar />
          <div className="wrap">
            <AppRouter />
          </div>
          <Footer />
        </div>
      )}
    </BrowserRouter>
  )
})
export default App

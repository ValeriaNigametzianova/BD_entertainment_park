import { observer } from 'mobx-react-lite'
import React from 'react'
import { useContext } from 'react'
import { Alert } from 'react-bootstrap'
import { Context } from '../index'
import cl from '../styles/dialogWindow/dialogWindow.module.css'

const DialogWindow = observer(() => {
  const { park } = useContext(Context)

  const rootClasses = [cl.dialogWindow]
  if (park.visible) {
    rootClasses.push(cl.active)
  }

  return (
    <Alert
      variant={park.alertStatus === 200 ? 'success' : 'danger'}
      className={rootClasses.join(' ')}
      onClick={() => {
        park.setVisible(false)
      }}
    >
      {park.alertMessage}
    </Alert>
  )
})

export default DialogWindow

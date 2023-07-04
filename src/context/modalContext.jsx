import { createContext, useState } from 'react'

const ModalContext = createContext({})

function ModalProvider({ children }){

  const [ modalIsOpened, setModalIsOpened ] = useState(false)

  function openModal(){
    return setModalIsOpened(true)
  }

  function closeModal(){
    return setModalIsOpened(false)
  }

  const contextValue = {
    modalIsOpened,
    openModal,
    closeModal
  }

  return (
    <ModalContext.Provider value={contextValue}>
      { children }
    </ModalContext.Provider>
  )
}

export {
  ModalContext,
  ModalProvider
}
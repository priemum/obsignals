import { useContext } from 'react'
import { ModalContext } from '../context/modalContext'
import styles from '../styles/Modal.module.css'

import modal from '../images/modal.png'
import closeButton from '../images/closeButton.svg'

function Modal(){
  const { closeModal } = useContext(ModalContext)

  return (
    <div className={styles.modalContainer}>
      <span>
        <button onClick={()=> closeModal()}>
          <img src={closeButton} width={28} height={28} alt="Close button" />
        </button>
        <img src={modal} alt="Modal" />
      </span>
    </div>
  )
}

export default Modal
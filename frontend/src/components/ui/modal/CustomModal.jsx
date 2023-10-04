import React from 'react'
import './CustomModal.scss'
import {useDispatch} from "react-redux"
import {toggleModal} from "../../../store/actions/modalActions"

const CustomModal = ({children}) => {
  const dispatch = useDispatch()

  const closeModal = () => {
    dispatch(toggleModal({
      modalVisible: false,
      modalContent: null
    }))
  }

  return (
    <div className="modal_outer" onClick={closeModal}>
      <div className="modal_inner" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default CustomModal

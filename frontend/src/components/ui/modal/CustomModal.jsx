import React from 'react'
import './CustomModal.scss'
import {useDispatch, useSelector} from 'react-redux'
import {toggleModal} from '../../../store/actions/modalActions'
import {removeTaskError} from '../../../store/actions/taskActions'

const CustomModal = () => {
  const dispatch = useDispatch()
  const {modalVisible, modalContent} = useSelector(store => store.modal)

  const closeModal = () => {
    dispatch(toggleModal({
      modalVisible: false,
      modalContent: null
    }))
    dispatch(removeTaskError())
  }

  return (
    <div className={`modal_outer ${modalVisible && 'active'}`} onClick={closeModal}>
      <div className="modal_inner" onClick={e => e.stopPropagation()}>
        {modalContent}
      </div>
    </div>
  )
}

export default CustomModal

import React, {useEffect, useRef} from 'react'
import CustomButton from '../ui/button/CustomButton'
import './ProjectForm.scss'
import {useDispatch, useSelector} from "react-redux";
import {removeProjectError} from "../../store/actions/projectActions";
import {selectProjectError} from "../../store/reducers/projectReducer";

const ProjectForm = ({onSubmit, autoFocus = false, initialValue = {name: '', description: ''}, buttonText}) => {
  const name = useRef()
  const description = useRef()
  const error = useSelector(selectProjectError)
  const dispatch = useDispatch()

  useEffect(() => {
    name.current.value = initialValue.name
    description.current.value = initialValue.description
    return () => {
      dispatch(removeProjectError())
    }
  })

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit({
      ...initialValue,
      name: name.current.value,
      description: description.current.value
    })
    name.current.value = ''
    description.current.value = ''
  }

  return (
    <>
      {
        error ? <div className="error-msg">{error}</div> : ''
      }
      <form onSubmit={handleSubmit} className='project_form'>
        <div className='project_form_title'>Create project</div>
        <input
          autoFocus={autoFocus}
          ref={name}
          type='text'
          className='input'
          placeholder='Project name' />
        <textarea
          ref={description}
          rows='10'
          className='project_textarea'
          placeholder='Project description'/>
        <CustomButton>{buttonText}</CustomButton>
      </form>
    </>
  )
}

export default ProjectForm

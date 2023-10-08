import React, {useState} from 'react'
import CustomInput from '../ui/input/CustomInput'
import CustomButton from '../ui/button/CustomButton'
import './ProjectForm.scss'
import CustomTextarea from '../ui/textarea/CustomTextarea'
import {useSelector} from "react-redux";

const ProjectForm = ({onSubmit, autoFocus = false, initialValue = {name: '', description: ''}, buttonText}) => {
  const [project, setProject] = useState(initialValue)
  const {error} = useSelector(store => store.projects)

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit(project)
    setProject({name: '', description: ''})
  }

  return (
    <>
      {
        error ? <div className="error-msg">{error}</div> : ''
      }
      <form onSubmit={handleSubmit} className='project_form'>
        <div className='project_form_title'>Create project</div>
        <CustomInput
          autoFocus={autoFocus}
          value={project.name}
          onChange={e => setProject({...project, name: e.target.value})}
          type='text'
          placeholder='Project name' />
        <CustomTextarea
          value={project.description}
          onChange={e => setProject({...project, description: e.target.value})}
          placeholder='Project description'
          rows='10' />
        <CustomButton>{buttonText}</CustomButton>
      </form>
    </>

  )
}

export default ProjectForm

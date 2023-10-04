import React from 'react'
import './ProjectItem.scss'
import {useNavigate} from "react-router-dom"
import {getCookie} from "../../utils"
import IconBtn from "../ui/iconBtn/IconBtn"
import {FaEdit, FaTrash} from 'react-icons/fa'
import {deleteProjectRequested, editProjectRequested} from "../../store/actions/projectActions"
import {useDispatch} from "react-redux"
import {toggleModal} from "../../store/actions/modalActions"
import ProjectForm from "../projectForm/ProjectForm"

const ProjectItem = ({project}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function onProjectUpdate(project) {
    const {tasks, user, ...data} = project
    dispatch(editProjectRequested(data))
    dispatch(toggleModal({modalVisible: false, modalContent: null}))
  }

  function onProjectEdit(e, project){
    e.stopPropagation()
    dispatch(
      toggleModal({
        modalVisible: true,
        modalContent: <ProjectForm autoFocus onSubmit={onProjectUpdate} initialValue={project} buttonText='Update' />
      })
    )
  }

  function onProjectDelete(e, id){
    e.stopPropagation()
    dispatch(deleteProjectRequested({projectId: id}))
  }

  return (
    <div className='project_item'>
      <div onClick={() => navigate(`projects/${project.id}`)} className='project_item_body'>
        <div className='project_item_header'>
          <div className='project_item_title'>{project.name}</div>
          {
            project.user.id === getCookie('userId') && <div className='project_item_icons'>
              <IconBtn onClick={e => onProjectEdit(e, project)}  Icon={FaEdit} />
              <IconBtn onClick={e => onProjectDelete(e, project.id)} Icon={FaTrash} color="danger" />
            </div>
          }
        </div>
        <div className='project_item_text'>{project.description}</div>
      </div>
    </div>
  )
}

export default ProjectItem

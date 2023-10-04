import React from 'react'
import './Navbar.scss'
import {Link} from 'react-router-dom'
import {useLocation} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {toggleModal} from '../../store/actions/modalActions'
import ProjectForm from '../projectForm/ProjectForm'
import {addProjectRequested} from '../../store/actions/projectActions'
import TaskForm from '../taskForm/TaskForm'
import {addTaskRequested} from '../../store/actions/taskActions'

const Navbar = () => {
  const location = useLocation()
  const dispatch = useDispatch()

  function onProjectCreate(project) {
    dispatch(addProjectRequested(project))
    dispatch(toggleModal({modalVisible: false, modalContent: null}))
  }

  function onTaskCreate(task) {
    dispatch(addTaskRequested(task))
    dispatch(toggleModal({modalVisible: false, modalContent: null}))
  }

  return (
    <header className='header'>
      <div className='header_container container'>
        <div className='header_logo'>
          <Link to={'/'}>
            <img src={require('../../assets/logo.png')} alt="cover"/>
          </Link>
        </div>
        <div className='header_menu menu'>
          <ul className='menu_list'>
            <li className='menu_item'>
              {
                location.pathname.startsWith('/projects')
                  ?
                  <div className='menu_link'
                       onClick={() => dispatch(
                         toggleModal({
                           modalVisible: true,
                           modalContent: <TaskForm autoFocus onSubmit={onTaskCreate} buttonText='Create' />
                         })
                       )}>New Task
                  </div>
                  :
                  <div className='menu_link'
                       onClick={() => dispatch(
                         toggleModal({
                           modalVisible: true,
                           modalContent: <ProjectForm autoFocus onSubmit={onProjectCreate} buttonText='Create' />
                         })
                       )}>New Project
                  </div>
              }
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Navbar

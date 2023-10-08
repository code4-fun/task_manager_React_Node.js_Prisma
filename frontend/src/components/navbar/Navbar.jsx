import React, {useEffect} from 'react'
import './Navbar.scss'
import {Link} from 'react-router-dom'
import {useLocation} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {toggleModal} from '../../store/actions/modalActions'
import {addProjectRequested} from '../../store/actions/projectActions'
import {addTaskRequested} from '../../store/actions/taskActions'
import CustomDropdown from "../ui/customDropdown/customDropdown";
import {getCookie} from "../../utils";
import TaskForm from "../taskForm/TaskForm";
import ProjectForm from "../projectForm/ProjectForm";
import SearchForm from "../searchResult/SearchForm";
import {saveUser} from "../../store/actions/authActions";

const Navbar = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const {userName} = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(saveUser(getCookie('userName')))
  }, [])

  function onProjectCreate(project) {
    dispatch(addProjectRequested(project))
  }

  function onTaskCreate(task) {
    dispatch(addTaskRequested(task))
  }

  const dropdownChangeHandler = param => {
    if(param === 'createTask'){
      dispatch(
        toggleModal({
          modalVisible: true,
          modalContent: <TaskForm autoFocus onSubmit={onTaskCreate} buttonText='Create' />
        })
      )
    } else if(param === 'createProject'){
      dispatch(
        toggleModal({
          modalVisible: true,
          modalContent: <ProjectForm autoFocus onSubmit={onProjectCreate} buttonText='Create' />
        })
      )
    } else if(param === 'search'){
      dispatch(
        toggleModal({
          modalVisible: true,
          modalContent: <SearchForm autoFocus />
        })
      )
    }
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
          {
            location.pathname.startsWith('/projects')
            ?
            <CustomDropdown
              onChange={dropdownChangeHandler}
              initialValue={userName || 'user'}
              options={[
                {value: 'createTask', name: 'Create Task'},
                {value: 'search', name: 'Search Task'}
              ]} />
            :
            <CustomDropdown
              onChange={dropdownChangeHandler}
              initialValue={userName || 'user'}
              options={[
                {value: 'createProject', name: 'Create Project'},
                {value: 'search', name: 'Search Task'}
              ]} />
          }
        </div>
      </div>
    </header>
  )
}

export default Navbar

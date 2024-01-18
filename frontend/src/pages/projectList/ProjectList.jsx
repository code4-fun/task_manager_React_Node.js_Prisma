import React, {useEffect} from 'react'
import './ProjectList.scss'
import ProjectItem from "../../components/projectItem/ProjectItem"
import CustomModal from "../../components/ui/modal/CustomModal"
import {useDispatch, useSelector} from "react-redux"
import {fetchProjectsRequested} from "../../store/actions/projectActions"
import {selectAllProjects, selectProjectLoadingFlag} from "../../store/reducers/projectReducer";

const ProjectList = () => {
  const dispatch = useDispatch()
  const projects = useSelector(selectAllProjects)
  const loading = useSelector(selectProjectLoadingFlag)

  useEffect(() => {
    dispatch(fetchProjectsRequested())
  }, [])

  if(loading) return <div>Loading...</div>
  return (
    <>
      <CustomModal />
      <div className='projectList'>
        {
          projects.map(project => <ProjectItem key={project.id} project={project} />)
        }
      </div>
    </>
  )
}

export default ProjectList

import React, {useEffect} from 'react'
import './ProjectList.scss'
import ProjectItem from "../../components/projectItem/ProjectItem"
import CustomModal from "../../components/ui/modal/CustomModal"
import {useDispatch, useSelector} from "react-redux"
import {fetchProjectsRequested} from "../../store/actions/projectActions"

const ProjectList = () => {
  const dispatch = useDispatch()
  const {modalVisible, modalContent} = useSelector(store => store.modal)
  const {projects, loading, error} = useSelector(store => store.projects)

  useEffect(() => {
    dispatch(fetchProjectsRequested())
  }, [])

  if(loading) return <div>Loading...</div>
  if(error) return <div className="error-msg">{error}</div>
  return (
    <>
      {
        modalVisible && <CustomModal children={modalContent}/>
      }
      <div className='projectList'>
        {
          projects.map(project => <ProjectItem key={project.id} project={project} />)
        }
      </div>
    </>
  )
}

export default ProjectList

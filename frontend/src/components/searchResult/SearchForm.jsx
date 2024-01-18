import './SearchForm.scss'
import React, {useEffect} from 'react'
import CustomInput from "../ui/input/CustomInput";
import {deleteSearchResult, searchTasksRequested} from "../../store/actions/taskActions";
import {useDispatch, useSelector} from "react-redux";
import {toggleModal} from "../../store/actions/modalActions";
import TaskMajor from "../taskMajor/TaskMajor";

const SearchForm = () => {
  let timer = null
  const dispatch = useDispatch()
  const {searchResult} = useSelector(state => state.tasks)

  useEffect(() => {
    return () => {
      dispatch(deleteSearchResult())
    }
  }, [])

  const searchTask = searchString => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      dispatch(searchTasksRequested(searchString))
    }, 1000)
  }

  return (
    <div className='search_form'>
      <div className='search_field'>
        <CustomInput autoFocus
                     autoComplete='off'
                     type='search'
                     onChange={e => searchTask(e.target.value)}
                     placeholder='Search' />
      </div>
      <div className='search_result_list'>
        {
          searchResult?.map(task =>
            <div
              key={task.id}
              className='search_result_line'
              onClick={() => dispatch(
                toggleModal({
                  modalVisible: true,
                  modalContent: <TaskMajor taskId={task.id} />
                })
             )}>
              <div>{task.number}</div>
              <div>{task.title}</div>
          </div>)
        }
      </div>
    </div>
  )
}

export default SearchForm

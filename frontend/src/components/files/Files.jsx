import './Files.scss'
import React, {useRef} from 'react'
import {FaTrash} from 'react-icons/fa'
import IconBtn from '../ui/iconBtn/IconBtn'
import {useDispatch} from "react-redux";
import {uploadFileRequested, deleteFileRequested} from "../../store/actions/fileActions";

const Files = ({files, taskId}) => {
  const dispatch = useDispatch()
  const filePicker = useRef(null)

  const deleteFile = fileId => {
    dispatch(deleteFileRequested({taskId, fileId}))
  }

  const uploadFile = (e) => {
    if(!e.target.files[0]?.name) return
    const formData = new FormData()
    formData.append('file', e.target.files[0])
    dispatch(uploadFileRequested({taskId, formData}))
  }

  const openFile = path => {
    console.log(path)
  }

  const handlePick = () => {
    filePicker.current.click()
  }

  return (
    <div className='file_component'>
      {
        files?.length > 0 &&
          <div className='file_body'>
            <div className='file_title'>Files</div>
            <div className='file_list'>
              {
                files?.map(file => <div className='file_list_line' key={file.id}>
                  <div onClick={() => openFile(file.path)} className='file_name'>
                    {file.name}
                  </div>
                  <IconBtn onClick={() => deleteFile(file.id)} Icon={FaTrash} aria-label="Delete" color="danger" />
                </div>)
              }
            </div>
          </div>
      }
      <div className='file_picker'>
        <input className='file_input' ref={filePicker} type='file' onChange={uploadFile} accept='image/*, .txt, .pdf' />
        <div onClick={handlePick} className='upload_file_button'>Upload file</div>
      </div>
    </div>
  );
};

export default Files

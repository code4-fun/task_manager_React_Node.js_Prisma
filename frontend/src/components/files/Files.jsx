import './Files.scss'
import React from 'react'
import {FaTrash} from 'react-icons/fa'
import IconBtn from '../ui/iconBtn/IconBtn'

const Files = ({files}) => {
  const removeFile = () => {
  }

  return (
    <div className='file_list'>
      {
        files?.map(file => <div className='file_list_line' key={file.id}>
          <div className='file_name'>
            {file.name}
          </div>
          <IconBtn onClick={() => removeFile(file.id)} Icon={FaTrash} aria-label="Delete" color="danger" />
        </div>)
      }
      <div className='upload_file_button'>Upload file</div>
    </div>
  );
};

export default Files

import React from 'react'
import classes from './CustomTextarea.module.scss'

const CustomTextarea = ({additionalClasses, ...props}) => {
  return (
    <textarea className={[additionalClasses, classes.input].join(' ')} {...props} />
  )
}

export default CustomTextarea

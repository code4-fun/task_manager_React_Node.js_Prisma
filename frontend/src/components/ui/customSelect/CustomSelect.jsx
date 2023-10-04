import React, {useEffect, useState} from 'react'
import './CustomSelect.scss'

const CustomSelect = ({options, onChange, initialValue = ''}) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    onChange(value)
  }, [value])

  return (
    <select
      className='custom-select'
      value={value}
      onChange={e => setValue(e.target.value)}>
      {
        options.map(item => <option className='custom-option' value={item} key={item}>{item}</option>)
      }
    </select>
  )
}

export default CustomSelect

import React, {useEffect} from 'react'
import './customDropdown.scss'

const CustomDropdown = ({onChange, options, initialValue}) => {
  useEffect(() => {
    document.addEventListener("click", e => {
      const isDropdownButton = e.target.matches('[data-dropdown-button], .chevron')
      let currentDropdown = e.target.closest('[data-dropdown]')

      if(e.target && e.target.matches('.call_dropdown .dropdown-menu .link')){
        currentDropdown.classList.remove('active')  // скрытие dropdown list
        document.querySelector('.chevron').classList.remove('active')
        document.querySelector('.chevron').classList.remove('top')
        document.querySelector('.chevron').classList.add('bottom')
        Array.from(e.target.closest('[data-dropdown]').children).forEach(child => {
          if(child.matches('[data-dropdown-button]')){
            onChange(e.target.dataset.optionValue)
          }
        })
      }

      if (isDropdownButton){
        currentDropdown.classList.toggle('active')
        if(currentDropdown.className?.includes('active')){
          document.querySelector('.chevron').classList.remove('bottom')
          document.querySelector('.chevron').classList.add('top')
        } else {
          document.querySelector('.chevron').classList.remove('top')
          document.querySelector('.chevron').classList.add('bottom')
        }
      }

      document.querySelectorAll("[data-dropdown].active").forEach(dropdown => {
        if (dropdown === currentDropdown){
          return
        }
        dropdown.classList.remove('active')
        document.querySelector('.chevron').classList.remove('active')
        document.querySelector('.chevron').classList.remove('top')
        document.querySelector('.chevron').classList.add('bottom')
      })
    })

    document.addEventListener('mouseover', e => {
      if(e.target && e.target.matches('.call_btn')) {
        document.querySelector('.call_dropdown .chevron').classList.add('active')
      }
    })

    document.addEventListener('mouseout', e => {
      if(e.target && e.target.matches('.call_btn')) {
        if(document.querySelector('.call_dropdown').className?.includes('active')){
          return
        }
        document.querySelector('.call_dropdown .chevron').classList.remove('active')
      }
    })
  }, [])

  return (
    <div className="dropdown call_dropdown" data-dropdown>
      <div className="link call_btn" data-dropdown-button data-selected-value={initialValue}>{initialValue}</div>
      <span className="chevron bottom call_btn"></span>
      <div className="dropdown-menu">
        {
          options.map(option => <div
            key={option.name}
            data-option-value={option.value}
            className="link">{option.name}</div>)
        }
      </div>
    </div>
  )
}

export default CustomDropdown

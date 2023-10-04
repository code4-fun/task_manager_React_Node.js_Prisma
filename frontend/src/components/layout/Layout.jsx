import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import './Layout.scss'

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className='page'>
        <div className='container'>
          <Outlet />
        </div>
      </main>
      <footer className='footer'>
        <div className='footer_container container'>
          &copy; Copyright 2023
        </div>
      </footer>
    </>
  )
}

export default Layout

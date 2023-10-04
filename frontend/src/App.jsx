import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from "./components/layout/Layout"
import Project from "./pages/project/Project"
import ProjectList from "./pages/projectList/ProjectList"

function App() {
  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ProjectList />} />
          <Route path="projects/:id" element={<Project />} />
          <Route path="*" element={<ProjectList />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App

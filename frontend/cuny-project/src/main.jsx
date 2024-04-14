import React from 'react'
import ReactDOM from "react-dom/client"
import './App.css'
import Home from './components/student/studentHome.jsx'
import Internships from './components/student/studentInternships.jsx'
import Student_Profile from './components/student/studentProfile.jsx'
import Professor_Profile from './components/professor/professorProfile.jsx'
// import Other_Profile from './components/student/otherProfile.jsx';
import Internships2 from './components/professor/professorInternships.jsx'
import Create_Job from './components/professor/createJob.jsx';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>

          <Route
            path='/student/studentHome'
            element = {<Home/>}
          />

          <Route
            path='/student/studentProfile'
            element = {<Student_Profile/>}
          />
          
          <Route
            path='/student/studentInternships'
            element = {<Internships/>}
          />

          <Route
            path='/professor/professorProfile'
            element = {<Professor_Profile/>}
          />

          <Route
            path='/professor/professorInternships'
            element = {<Internships2/>}
          />

          <Route 
            path='/professor/createJob'
            element={<Create_Job/>}
          />


          {/* <Route
            path = '/student/otherProfile'
            element={<Other_Profile/>}
          /> */}

      </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)

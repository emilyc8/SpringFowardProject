import React from 'react'
import ReactDOM from "react-dom/client"
import './App.css'
import Home from './components/student/studentHome.jsx'
import Internships from './components/student/studentInternships.jsx'
import Student_Profile from './components/student/studentProfile.jsx'
import Staff_Profile from './components/staff/staffProfile.jsx'
// import Other_Profile from './components/student/otherProfile.jsx';
import Internships2 from './components/staff/staffInternships.jsx'
import Create_Job from './components/staff/createJob.jsx';
import Start from './components/Start.jsx'
import StudentLogin from './components/StudentLogin.jsx';
import StaffLogin from './components/StaffLogin.jsx';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
          <Route path='/' element = {<Start/>}/>

          <Route path="/studentLogin" element={<StudentLogin />} />
          <Route path="/staffLogin" element={<StaffLogin />} />

          <Route path='/student/studentHome'element = {<Home/>}/>
          <Route path='/student/studentProfile' element = {<Student_Profile/>}/>
          <Route path='/student/studentInternships' element = {<Internships/>}/>

          <Route path='/staff/staffProfile' element = {<Staff_Profile/>}/>
          <Route path='/staff/staffInternships' element = {<Internships2/>}/>
          <Route path='/staff/createJob' element={<Create_Job/>}/>


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

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
import Register from './components/Register.jsx';
import StaffRegister from './components/staffRegister.jsx'
import AdditionalInformation from './components/AdditionalInformation.jsx'
import StaffHome from './components/staff/staffHome.jsx'
import Other_Profile from './components/student/otherProfile.jsx'
import Chatbot from './components/Chatbot.jsx';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
          <Route path='/' element = {<Start/>}/>

          <Route path="/studentLogin" element={<StudentLogin />} />
          <Route path="/staffLogin" element={<StaffLogin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/staffRegister" element={<StaffRegister />} />
          <Route path="/additionalInformation" element={<AdditionalInformation />} />
          <Route path="/chatbot" element={<Chatbot />} />


          <Route path='/student/studentHome'element = {<Home/>}/>
          <Route path='/student/studentProfile' element = {<Student_Profile/>}/>
          <Route path='/student/studentInternships' element = {<Internships/>}/>

          <Route path='/staff/staffHome'element = {<StaffHome/>}/>
          <Route path='/staff/staffProfile' element = {<Staff_Profile/>}/>
          <Route path='/staff/staffInternships' element = {<Internships2/>}/>
          <Route path='/staff/createJob' element={<Create_Job/>}/>     


          <Route
            path="/profile/:userId" element={<Other_Profile/>} 
          />

      </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)

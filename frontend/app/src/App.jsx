
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LandingPage from './components/LandingPage'
import LoginPage from './components/LoginPage'
import CreateuserPage from './components/CreateuserPage'
import FacultyPage from './components/FacultyPage'
import StudentPage from './components/StudentPage'
import CreateStudent from './components/CreateStudent'
import Studentprofile from './components/Studentprofile'

function App() {
  
  return (
   <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/createuser" element={<CreateuserPage/>}/>
        <Route path="/faculty" element={<FacultyPage/>}/>
        <Route path="/student/:id" element={<StudentPage/>}/>
        <Route path="/createStudent" element={<CreateStudent/>}/>
        <Route path="/studentprofile/:id" element={<Studentprofile/>}/>
      </Routes>
   </Router>
  )
}

export default App

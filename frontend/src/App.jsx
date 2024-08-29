import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Signup from './components/Signup'
import Login from './components/Login'
import MessageRoom from "./components/MessageRoom"
import Users from './components/Users'


function App() {

  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/fetchusers' element={<Users />} />
          <Route path='' element={<MessageRoom />} />
        </Routes>
      </BrowserRouter>


    </>
  )
}

export default App;

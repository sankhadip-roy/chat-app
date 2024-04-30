import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Signup from './Signup'
import Login from './Login'
import MessageRoom from "./MessageRoom"


function App() {

  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='' element={<MessageRoom />} />
        </Routes>
      </BrowserRouter>


    </>
  )
}

export default App;

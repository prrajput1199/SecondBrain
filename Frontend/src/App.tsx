import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './Pages/Signup';
import Signin from './Pages/Signin';
import Dashboard from './Pages/Dashboard';
import ForgetPassword from './Pages/ForgetPassword';
import ShareBrain from './Pages/ShareBrain';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signin/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/forgetpassword' element={<ForgetPassword/>}/>
        <Route path='dashboard' element={<Dashboard/>}/>
        <Route path='/brain/share/:shareId' element={<ShareBrain/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
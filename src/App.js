import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Navbar from './Components/Navbar/Navbar';
import NotFound from './Components/NotFound/NotFound';
import Register from './Components/Register/Register';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Toaster></Toaster>
     <Routes>
     <Route path='/' element={<Login></Login>}></Route>
      <Route path='/home' element={<Home></Home>}></Route>
      <Route path='/register' element={<Register></Register>}></Route>
      <Route path='*' element={<NotFound></NotFound>}></Route>
     </Routes>
    </div>
  );
}

export default App;

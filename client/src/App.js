import './App.css';
import LoginForm from './components/LoginForm';
import Courses from './components/Courses';
import RegisterForm from './components/RegisterForm';
import MyCourses from './components/MyCourses';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginForm />} />
          <Route path='/courses' element={<Courses />} />
          <Route path='/myCourses' element={<MyCourses/>} />
          <Route path='/register' element={<RegisterForm/>} />
        </Routes>
      </BrowserRouter>

      {/* <Courses/> */}
    </>
  );
}

export default App;

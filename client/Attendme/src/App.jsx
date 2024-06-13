
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import AdminAuth from './pages/AdminAuth';
import StudentAuth from './pages/StudentAuth';
import Logout from './pages/Logout'
import Dashboard from './pages/Dashboard';
import Attendences from './pages/Attendences';
import IndexPage from './pages/IndexPage';
import Checkinout from './pages/Checkinout';
import Students from './pages/Students'
import { MainProvider } from './MainProvider';
import { ToastContainer } from 'react-toastify';
import Newstudent from './pages/Newstudent';

function App() {

  return (
    <MainProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/auth/admin" element={<AdminAuth />}></Route>
          <Route path="/auth/student" element={<StudentAuth />}></Route>
          <Route path="/auth/logout" element={<Logout />}></Route>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<IndexPage />} />
            <Route path="attendances" element={<Attendences />}></Route>
            <Route path="checkinout" element={<Checkinout />}></Route>
            <Route path="students" element={<Students />}></Route>
            <Route path="new-student" element={<Newstudent />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </MainProvider>
  )
}

export default App

import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import JobsPage from './pages/JobsPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';


function App() {

  return (

    <Routes>
      <Route path="/" element = {<Home /> } />
      <Route path="/jobs" element = {<JobsPage /> } />
      <Route path="/login" element = {<LoginPage /> } />
      <Route path="/signup" element = {<SignUpPage />} />
    </Routes>
  
    
  )
}

export default App

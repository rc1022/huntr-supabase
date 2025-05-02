import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import JobsPage from './pages/JobsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';


function App() {

  return (

    <Routes>
      <Route path="/" element = {<Home /> } />
      <Route path="/jobs" element = {<JobsPage /> } />
      <Route path="/login" element = {<LoginPage /> } />
      <Route path="/signup" element = {<SignupPage />} />
    </Routes>
  
    
  )
}

export default App

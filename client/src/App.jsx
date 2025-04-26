import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import JobsPage from './pages/JobsPage';


function App() {

  return (

    <Routes>
      <Route path="/" element = {<Home /> } />
      <Route path="/jobs" element = {<JobsPage /> } />
    </Routes>
  
    
  )
}

export default App

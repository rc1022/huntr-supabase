import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import JobsPage from './pages/JobsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PrivateRoute from './route/PrivateRoute';
import PublicRoute from './route/PublicRoute';

function App() {

  return (

    <Routes>
      <Route path="/" element={
        <PublicRoute >
          <Home />
        </PublicRoute>
      } />

      <Route path="/login" element={
        <PublicRoute >
          <LoginPage />
        </PublicRoute>
      } />

      <Route path="/signup" element={
        <PublicRoute >
          <SignupPage />
        </PublicRoute>
      } />

      <Route path="/jobs" element={
        <PrivateRoute>
          <JobsPage />
        </PrivateRoute>
      } />


    </Routes>
  
    
  )
}

export default App

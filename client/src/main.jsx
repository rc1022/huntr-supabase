import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { JobsProvider } from './context/JobsContext.jsx'
import { UserProvider } from './context/UserContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProvider>
    <JobsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </JobsProvider>
  </UserProvider>

   

)

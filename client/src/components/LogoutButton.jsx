import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext"
import useJobs from "../hooks/useJobs";


function LogoutButton() {

    const { logout } = useUser();
    const { setIsLoading } = useJobs();
    const navigate = useNavigate();

  return (
    <button className='m-1 py-1 px-3 rounded-xl text-sm bg-gray-300 text-gray-500 font-poppins cursor-pointer btn-animate'
            onClick={() => {
                setIsLoading(true)
                setInterval(() => {
                  setIsLoading(false);
                  logout();
                  navigate('/');  
                }, 1500)
                              
                }}>
        Log out
    </button>
  )
}

export default LogoutButton
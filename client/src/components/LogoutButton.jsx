import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext"


function LogoutButton() {

    const { logout } = useUser();
    const navigate = useNavigate();

  return (
    <button className='m-1 py-1 px-3 rounded-xl text-sm bg-gray-300 text-gray-500 font-poppins cursor-pointer btn-animate'
            onClick={() => {
                logout();
                navigate('/login');                
                }}>
        Log out
    </button>
  )
}

export default LogoutButton
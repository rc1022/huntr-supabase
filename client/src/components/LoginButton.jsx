import React from 'react'
import { useNavigate } from 'react-router-dom'

function LoginButton() {

    const navigate = useNavigate();

  return (
    <button 
        onClick={() => navigate('/login')}
        className='m-1 p-1 rounded-2xl h-10 w-25 md:h-12 md:w-35 text-lg md:text-2xl bg-main text-ivory font-poppins cursor-pointer hover:scale-110 ease-in-out duration-500'>
        Login
    </button>
  )
}

export default LoginButton
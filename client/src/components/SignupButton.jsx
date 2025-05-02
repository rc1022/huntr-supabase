import React from 'react'
import { useNavigate } from 'react-router-dom'

function SignupButton() {

  const navigate = useNavigate();

  return (
    <button 
        onClick={()=>navigate('/signup')}
        className='mt-3 md:mt-8 p-1 rounded-2xl h-10 w-25 md:h-12 md:w-35 text-lg md:text-2xl border-main border-3 text-main font-poppins cursor-pointer hover:scale-110 ease-in-out duration-500'>
        
        Sign Up
    </button>
  )
}

export default SignupButton
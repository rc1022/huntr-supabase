import React from 'react'
import { useNavigate } from 'react-router-dom'

function Header() {

  const navigate = useNavigate();

  return (
    <div className='sticky z-50 top-0 flex justify-center bg-main text-xl p-2 text-ivory font-sgothic'> 
      <span  onClick={() => navigate('/')}className='cursor-pointer'>
        Huntr </span>
    </div>
  )
}

export default Header
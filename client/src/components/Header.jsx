import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Eclipse } from 'lucide-react';


function Header({ onToggleMobileDashboard } ) {

  const navigate = useNavigate();

  return (
    <div className='sticky z-50 top-0 flex justify-center bg-main text-xl p-2 text-ivory font-sgothic '> 
      
      <button
        className='absolute left-2 top-0 bottom-0 flex items-center md:hidden'
        aria-label="Toggle dashboard"
        onClick={onToggleMobileDashboard}>
        <Eclipse size={20}/>
      </button>
      
      <span  onClick={() => navigate('/')}className='cursor-pointer'>
        Huntr </span>
    </div>
  )
}

export default Header
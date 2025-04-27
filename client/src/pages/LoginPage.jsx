import React from 'react'
import { useUser } from '../context/UserContext'
import { useNavigate } from 'react-router-dom';

function LoginPage() {

  const { user, isLoading, error, signup } = useUser();

  const navigate = useNavigate();



  return (
    <div className='bg-ivory w-screen h-screen flex items-center justify-center'>
      <div className='w-3/4 h-3/4 xl:w-1/3 xl:h-1/2 relative border-4 p-4 flex'>

        <div className='w-1/5 flex items-center justify-center overflow-hidden'>
          <div className='font-sgothic text-8xl transform rotate-90 whitespace-nowrap'  >HUNTR</div>
        </div>

          <div className='grow flex flex-col justify-center gap-6 px-8 font-poppins '>
            <div className='text-2xl font-sgothic'>Login</div>
            <div className='flex flex-col'>
              <label htmlFor='email' className='text-xl mb-2'> Email: </label>
              <input id="email" name="email" type='text'
                className='border-2 p-2 rounded-lg'/> 
            </div>

          <div className='flex flex-col'>
            <label htmlFor='password' className='text-xl mb-2'> Password: </label>
            <input id='password' name='password' type='password' 
                className='border-2 p-2 rounded-lg'/> 
            <label className='mt-2 ml-2 text-main/50 text-sm hover:text-main/80 cursor-pointer'> Forgot password?</label>
          </div>
         

          <div className='flex justify-end'>
            <button 
              className=' text-main border-main border-2 px-2 py-1 mt-1 rounded-md right-1 btn-animate cursor-pointer'>
                login
            </button>
          </div>

          <div className='flex justify-end items-center' >
            <label className='text-main/50'>New to huntr?</label>
            <button 
              onClick={() => navigate('/signup')}
              className='underline text-main px-2 py-1 rounded-md right-1 btn-animate cursor-pointer'>
                Create an account
            </button>
          </div>
          

          </div>


      </div>
    </div>
  )
}

export default LoginPage
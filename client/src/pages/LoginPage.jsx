import React, { useState } from 'react'
import { useUser } from '../context/UserContext'
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

function LoginPage() {

  const { login } = useUser();
  const [ showPassword, setShowPassword ] = useState(false);
  const navigate = useNavigate();

  const [ loginData, setLoginData] = useState({
    email: "",
    password:"",
  });

  const handleChange = ( e ) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]:value}));
  }

  const handleLogin = async ( data ) => {
    console.log(data)
    const result = await login(data);
    if (result) {
      navigate('/jobs');
    } else {
      alert('Login failed!')
    }
  }



  return (
    <div className='bg-ivory w-screen h-screen flex items-center justify-center'>
      <div className='w-3/4 h-5/9 xl:w-1/3 md:h-1/2 lg:h-4/5 xl:h-3/5 relative border-4 p-4 md:flex rounded-sm'>

        <div className='w-1/5 hidden items-center justify-center md:flex'>
          <div className='font-sgothic text-8xl transform rotate-90 whitespace-nowrap '  >HUNTR</div>
        </div>
        <div className='flex md:hidden items-center justify-center mt-5 mb-10'>
          <div className='font-sgothic text-3xl'  >HUNTR</div>
        </div>

          <div className='grow flex flex-col justify-center gap-2 md:gap-5 px-4 md:px-8 font-poppins '>
            <div className='text-2xl md:text-3xl font-sgothic'>Login</div>
            <div className='flex flex-col'>
              <label htmlFor='email' className='text-lg md:text-xl mb-2'> Email: </label>
              <input id="email" name="email" type='text'
                value={loginData.email}
                onChange={handleChange}
                className='border-2 p-2 rounded-lg'/> 
            </div>

          <div className='flex flex-col'>
            <label htmlFor='password' className='text-lg md:text-xl mb-2'> Password: </label>
            <div className='relative w-full'>
              <input id='password' name='password' type={showPassword ? 'text' : 'password'}
                  value={loginData.password}
                  onChange={handleChange}
                  className='border-2 p-2 rounded-lg w-full'/> 
              <button 
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-sm pr-2'> 
                  {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}</button>
            </div>
            <label className='mt-2 ml-2 text-main/50 text-sm hover:text-main/80 cursor-pointer'> Forgot password?</label>
          </div>
         

          <div className='flex justify-end'>
            <button
              onClick={() => handleLogin(loginData)} 
              className=' text-main border-main border-2 px-2 py-1 mt-1 rounded-md right-1 btn-animate cursor-pointer'>
                login
            </button>
          </div>

          <div className='flex justify-end items-center text-center' >
            <label className='text-main/50'>
                New to huntr?
            </label>
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
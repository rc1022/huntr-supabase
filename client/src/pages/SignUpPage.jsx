import React, { useState } from 'react'
import { useUser } from '../context/UserContext'
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';


function SignupPage() {

    const { user, signup } = useUser();
    const [ formData, setFormData ] = useState({
        email:'',
        password:''
    });
    const [ error, setError ] = useState(null);
    const [ showPassword, setShowPassword ] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value
        }))
    }

    const handleSignup = async (e) => {
        e.preventDefault();
    
        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters long.');
            return
        }

        if (!/[0-9]/.test(formData.password)) {
            setError('Password must contain at least one number.');
            return
        }

        if (!/[a-zA-Z]/.test(formData.password)) {
            setError('Password must contain at least one letter.');
            return
        }
        
        signup(formData);
      }

  return (
    <div className='bg-ivory w-screen h-screen flex items-center justify-center'>
      <div className='w-3/4 h-2/4 md:h-3/4 xl:w-1/3 xl:h-1/2 relative border-4 p-4 flex rounded-sm'>

        <div className='grow flex flex-col justify-center gap-2 px-8 font-poppins '>
            <div className='text-4xl md:text-6xl font-sgothic mb-5'>Sign Up</div>
            <div className='flex flex-col'>
              <label htmlFor='email' className='text-xl mb-2'> Email: </label>
              <input id="email" name="email" type='text'
                className='border-2 p-2 rounded-lg'
                value={formData.email}
                onChange={handleChange} /> 
            </div>

          <div className='flex flex-col'>
            <label htmlFor='password' className='text-xl mb-2'> Password: </label>
            <div className='relative w-full'>
                <input id='password' name='password' type={showPassword ? 'text' : 'password'}
                    className='border-2 p-2 rounded-lg w-full'
                    value={formData.password}
                    onChange={handleChange} />
                <button type='button' onClick={() => setShowPassword(!showPassword)}
                    className='absolute text-main/70 right-3 top-1/2 transform -translate-y-1/2 text-sm pr-2'>
                    {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                </button>
            </div>      
        </div>
            

            {error && <div className="text-red-500 mt-2">{error}</div>}


            <div className='flex justify-end space-x-10 mt-4'>
                
                {/* <button 
                    onClick={() => navigate('/login')}
                    className=' text-main border-main border-2 px-2 py-1 mt-1 rounded-md right-1 btn-animate cursor-pointer'>
                    Login
                </button> */}
                <button 
                    onClick={(e) => handleSignup(e)}
                    className=' text-ivory bg-main border-2 px-3 py-2 mt-1 rounded-md right-1 btn-animate cursor-pointer'>
                    Sign Up
                </button>
            </div>
            <div className='flex justify-end items-center text-center text-xs' >
            <label className='text-main/50'>
                already have an account?
            </label>
            <button 
              onClick={() => navigate('/signup')}
              className='underline text-main px-2 py-1 rounded-md right-1 btn-animate cursor-pointer'>
                login here!
            </button>
          </div>

        </div>
      </div> 
    </div>

    
  )
}

export default SignupPage
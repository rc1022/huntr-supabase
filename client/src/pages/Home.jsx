import React from 'react'
import Title from '../components/Title'
import LoginButton from '../components/LoginButton';
import SignupButton from '../components/SignupButton';



function Home() {

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-ivory">
      <Title />
      <LoginButton />
      <SignupButton />
      
    </div>


  )
}

export default Home
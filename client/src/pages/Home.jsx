import React from 'react'
import Title from '../components/Title'
import LoginButton from '../components/LoginButton';
import SignupButton from '../components/SignupButton';
import { Link as ScrollLink, Element } from "react-scroll"
import { motion } from "framer-motion";
import { ChevronDown } from 'lucide-react'; 
import Features from '../components/Features';

function Home() {

  return (
    <>
    <motion.div className="relative w-screen h-screen flex flex-col justify-center items-center bg-ivory"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: false }}
      >
      <Title />
      <LoginButton />
      <SignupButton />
      <a href="#about" className="absolute bottom-5 mt-10 animate-bounce">
          <ChevronDown size={20} strokeWidth={3} className="text-main" />
      </a>
    </motion.div>
    
    <Features />

    
  </>

  )
}

export default Home
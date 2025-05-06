import React from 'react'
import { motion } from "framer-motion";
import { Link as ScrollLink, Element } from "react-scroll"

const container = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1, y: 0,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
        type: "spring",
        bounce: 0.25,
      }
    }
  };

const item = {
hidden: { opacity: 0, y: 30 },
visible: { opacity: 1, y: 0 }
};

function Features() {
  return (
   <>
    {/* about huntr */}
    <motion.div
        id="about"
        className="border border-main/20 min-h-screen flex flex-col justify-center items-center bg-ivory px-6"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      >
        <motion.h2 className="text-4xl font-sgothic mb-6" variants={item}>
          About Huntr
        </motion.h2>
        <motion.p className="w-full md:w-2/3 text-xl font-poppins text-center mb-4" variants={item}>
          Huntr is your all-in-one job application tracker.<br/>
          Organize, prioritize, and visualize your job search journey.<br/>
          No more lost applications or missed follow-ups!
        </motion.p>
        <motion.span className="mt-6 font-poppins text-gray-500 text-base" variants={item}>
          Stay organized and focused on your job hunt!
        </motion.span>

    </motion.div>

    {/* features 1 */}
      <motion.div
        id="feature"
        className="flex min-h-screen flex-col justify-center items-center bg-ivory px-6 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={container}
      >
    
    {/* Content */}
        <div className='relative z-10 grid grid-cols-1 h-full w-full max-w-5xl md:grid-cols-2 gap-8 items-center '>
          <motion.div 
            className='flex justify-center items-center py-8'
            initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 12, delay: 0.2 }}
            viewport={{ once: false, amount: 0.3 }}
            >
          <img
            src="../screenshot/screenshot.jpeg"
            alt="Feature Screenshot"
            className="rounded shadow-lg min-w-[400px] max-w-full border-2 "
            style={{ maxHeight: 800 }}
          />
          </motion.div>


            <motion.div className='flex items-center h-full'
             variants={container}>
                <motion.p 
                    className="text-main px-5 py-2 font-sgothic m-5 text-center md:text-left text-5xl"
                    variants={item}>
                Track every application with date and status
                </motion.p>
            </motion.div>
        </div>
      </motion.div>

      {/* features 2 */}
      <motion.div
        id="feature"
        className=" min-h-screen flex flex-col justify-center items-center bg-ivory px-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        viewport={{ once: false }}
      >
        <div className='grid grid-cols-1 h-full w-full max-w-5xl md:grid-cols-2 gap-8 items-center '>
        <motion.div className='flex items-center h-full'
             variants={container}>
                <motion.p 
                    className="text-main px-5 py-2 font-sgothic m-5 text-center md:text-left text-5xl"
                    variants={item}>
                Visualize your process with beautiful data
                </motion.p>
            </motion.div>

        
        <motion.div 
            className='flex justify-center items-center py-8'
            initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 12, delay: 0.2 }}
            viewport={{ once: false, amount: 0.3 }}
            >
          <img
            src="../screenshot/screenshot.jpeg"
            alt="Feature Screenshot"
            className="rounded shadow-lg min-w-[400px] max-w-full border-2 "
            style={{ maxHeight: 800 }}
          />
          </motion.div>

        </div>
      </motion.div>
   </>
  )
}

export default Features
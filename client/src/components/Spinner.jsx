import React from 'react'
import { LoaderCircle } from 'lucide-react'

function Spinner() {
  return (
    <div className='fixed top-0 left-0 h-full w-full bg-main/40 flex justify-center items-center'>
        <LoaderCircle size={48} strokeWidth={2} className='animate-spin text-main'/>
    </div>
  )
}

export default Spinner
import { Button } from 'flowbite-react'
import React from 'react'

export default function CallToAction() {
  return (
    <>
    <div className="flex flex-col sm:flex-row p-3  border dark:border-teal-600 border-gray-800 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
        {/* -------left side -------*/}
        <div className='flex-1 justify-center flex flex-col' >
            <h2 className="text-2xl tracking-wider">
                Want To Learn More About MERN Stack?
            </h2>
            <p className="text-gray-500 my-2">
                Check Out These Resources on MERN
            </p>
            <Button gradientDuoTone='purpleToBlue' className='rounded-tl-xl rounded-bl-none'>
               <a href="https://www.youtube.com/@Firedkid1.0" target='_blank' rel='noopener noreferrer'>Learn More</a> </Button>
        </div>
        {/*------- right side------- */}
        <div className="flex-1 p-7 rounded-tr-3xl rounded-bl-3xl ">
        <img  src="https://sbr-technologies.com/wp-content/uploads/2021/07/Mern-Stack-Developer.png" alt="" />
        </div>
    </div>
    </>
  )
}

import { Button, FileInput, Select, TextInput } from 'flowbite-react'
import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function Create_Post() {
  return (
    <>
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
     <h1 className='text-center text-3xl my-7 font-bold tracking-wider'> Create A Post</h1>
     <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <TextInput type='text' placeholder='Title' required id='title' className='flex-1' />
            <Select>
                <option value='UnCategorized'>Select a category</option>
                <option value='html'>HTML/HTML5</option>
                <option value='css'>CSS</option>
                <option value='tailwindcss'>TailwindCSS</option>
                <option value='javascript'>JavaScript</option>
                <option value='mongodb'>MongoDB</option>
                <option value='express.js'>Express.js</option>
                <option value='react.js'>React.js</option>
                <option value='node.js'>Node.js</option>
                <option value='bootstrap'>Bootstrap</option>
                <option value='materialui'>MaterialUI</option>
            </Select>
        </div>
        <div className="flex gap-4 items-center justify-between   border-4 border-amber-500 border-dotted p-3 ">
       <FileInput type='file' accept='image/*' />
       <Button type='button' gradientDuoTone='cyanToBlue' outline>Upload Image</Button>
        </div>
            <ReactQuill theme='snow' placeholder='write something.....' className='h-72 mb-12' required/>
            <Button type='button' gradientDuoTone='cyanToBlue' >Publish</Button>
     </form>
      </div>
    </>
  )
}

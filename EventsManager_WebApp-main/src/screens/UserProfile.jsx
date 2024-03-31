import React from 'react';
import { Avatar, Input, Textarea } from '@material-tailwind/react';
import avatar from '../assets/profile.jpg'



function UserProfile(){
  return (
    <div className='bg-blue-gray-50 flex-1 items-center'>
      <div className='flex justify-around'>
        <div className='shadow-md rounded-lg m-auto'>
          <img src={`${avatar}`} alt="avatar" variant="circular" className='w-56 h-56 rounded-full object-cover'/>
          <div className='flex flex-col'>
            <div className='flex justify-center'>
              <h1 className='text-2xl font-bold text-blue-gray-900 mb-4'>
                NAME
              </h1>
            </div>
            <div className='flex justify-center'>
              <h1 className='text-xl font-bold text-blue-gray-900 mb-4'>
                EMAIL
              </h1>
            </div>
            <div className='flex justify-center'>
              <h1 className='text-xl font-bold text-blue-gray-900 mb-4'>
                +49 176 1234567
              </h1>
            </div>
          </div>
        </div>
    
        <div className='flex justify-center items-center'>
          <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:px-3 lg:mb-0 lg:w-5/12 lg:px-6 ">
            <form>
              <div className="relative mb-6 w-96">
                  <Input label="Username" className='w-[500px]' />
              </div>
              <div className="relative mb-6 w-96" >
                  <Input label="email" />
              </div>
              <div className="relative mb-6 w-96" >
                  <Input label="numéro" />
              </div>
              
              <button type="button"
                  className="mb-6 w-96 h-[2.5rem] inline-block  rounded px-6 pt-2.5 pb-2 btn-hero z-[100]  bg-green text-xs font-medium font-police uppercase text-white shadow-xs ">
                  Modifier
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
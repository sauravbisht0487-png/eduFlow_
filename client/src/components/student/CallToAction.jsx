import React from 'react'
import { assets } from '../../assets/assets'

const CallToAction = () => {
  return (
    <div className='relative flex flex-col items-center text-center gap-5 px-6 py-20 sm:py-28 overflow-hidden bg-gradient-to-b from-white via-blue-50/40 to-white'>
      {/* decorative blurred blobs */}
      <div className='absolute -top-20 left-1/4 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl pointer-events-none' />
      <div className='absolute -bottom-20 right-1/4 w-72 h-72 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none' />

      <span className='relative text-xs font-semibold tracking-wide text-blue-600 bg-blue-100/70 px-3 py-1 rounded-full'>
        START LEARNING TODAY
      </span>

      <h1 className='relative text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 max-w-2xl leading-tight'>
        Learn Anything,{' '}
        <span className='bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
          Anytime, Anywhere
        </span>
      </h1>

      <p className='relative text-sm sm:text-base text-slate-500 max-w-xl leading-relaxed'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error modi dolore
        commodi praesentium exercitationem harum, ea earum magnam voluptas officiis
        saepe quae nam in quasi minus reprehenderit fugiat vitae quis.
      </p>

      <div className='relative flex items-center gap-4 mt-3 flex-wrap justify-center'>
        <button className='bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold px-7 py-3 rounded-full shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300'>
          Get Started
        </button>
        <button className='flex items-center gap-2 text-sm font-semibold text-slate-700 px-7 py-3 rounded-full border border-slate-200 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300'>
          Learn More
          <img
            src={assets.arrow_icon}
            alt="arrow icon"
            className='w-4 h-4 transition-transform duration-300 group-hover:translate-x-1'
          />
        </button>
      </div>
    </div>
  )
}

export default CallToAction
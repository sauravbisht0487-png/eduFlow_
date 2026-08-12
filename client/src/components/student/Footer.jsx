import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <footer className='bg-slate-900 text-slate-300 pt-16 pb-6 px-6 sm:px-10 lg:px-20'>
      <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1.2fr] gap-10'>
        {/* Logo + about */}
        <div className='flex flex-col gap-4'>
          <img src={assets.logo_dark} alt="logo" className='w-32' />
          <p className='text-sm text-slate-400 leading-relaxed max-w-xs'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
            quae quia a assumenda beatae! Repellat, culpa. Minus laboriosam,
            laborum dolorum aperiam rem vero reprehenderit fugiat voluptatem
            ea, eos aliquid ab.
          </p>
          <div className='flex items-center gap-4 mt-2'>
            <a href="#" className='w-9 h-9 flex items-center justify-center rounded-full bg-slate-800 hover:bg-blue-600 transition-colors duration-300'>
              <img src={assets.facebook_icon} alt="facebook" className='w-4 h-4' />
            </a>
            <a href="#" className='w-9 h-9 flex items-center justify-center rounded-full bg-slate-800 hover:bg-blue-600 transition-colors duration-300'>
              <img src={assets.twitter_icon} alt="twitter" className='w-4 h-4' />
            </a>
            <a href="#" className='w-9 h-9 flex items-center justify-center rounded-full bg-slate-800 hover:bg-blue-600 transition-colors duration-300'>
              <img src={assets.instagram_icon} alt="instagram" className='w-4 h-4' />
            </a>
          </div>
        </div>

        {/* Company links */}
        <div>
          <h3 className='text-white font-semibold mb-4 text-sm tracking-wide'>COMPANY</h3>
          <ul className='flex flex-col gap-2.5 text-sm text-slate-400'>
            <li><a href="#" className='hover:text-blue-400 transition-colors'>Home</a></li>
            <li><a href="#" className='hover:text-blue-400 transition-colors'>About us</a></li>
            <li><a href="#" className='hover:text-blue-400 transition-colors'>Contact us</a></li>
            <li><a href="#" className='hover:text-blue-400 transition-colors'>Privacy policy</a></li>
          </ul>
        </div>

        {/* Resources links */}
        <div>
          <h3 className='text-white font-semibold mb-4 text-sm tracking-wide'>RESOURCES</h3>
          <ul className='flex flex-col gap-2.5 text-sm text-slate-400'>
            <li><a href="#" className='hover:text-blue-400 transition-colors'>Courses</a></li>
            <li><a href="#" className='hover:text-blue-400 transition-colors'>Educators</a></li>
            <li><a href="#" className='hover:text-blue-400 transition-colors'>FAQs</a></li>
            <li><a href="#" className='hover:text-blue-400 transition-colors'>Support</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className='text-white font-semibold mb-4 text-sm tracking-wide'>SUBSCRIBE</h3>
          <p className='text-sm text-slate-400 mb-4 leading-relaxed'>
            Get the latest courses and offers straight to your inbox.
          </p>
          <div className='flex items-center bg-slate-800 rounded-lg overflow-hidden'>
            <input
              type="email"
              placeholder="Your email"
              className='bg-transparent text-sm text-slate-200 placeholder:text-slate-500 px-3 py-2.5 flex-1 outline-none'
            />
            <button className='bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold px-4 py-2.5 hover:opacity-90 transition-opacity'>
              Join
            </button>
          </div>
        </div>
      </div>

      <div className='max-w-6xl mx-auto border-t border-slate-800 mt-12 pt-6'>
        <p className='text-xs text-center text-slate-500'>
          Copyright 2025 © GreatStack. All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer;
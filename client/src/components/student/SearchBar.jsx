import React,{useState} from "react";
import { assets } from '../../assets/assets'
import {useNavigate} from 'react-router-dom'

const SearchBar = ({data}) => {
  const navigate= useNavigate()
  const [input,setInput] =useState(data ? data : '')
   
  const onSearchHandler =(e)=>{
    e.preventDefault()
    navigate(`/course-list/${input}`)
  }

  return (
    <div className='w-full flex justify-center'>
      <form onSubmit={onSearchHandler} className='flex items-center w-full max-w-2xl bg-white border border-gray-500/20 rounded-lg overflow-hidden'>
        <img src={assets.search_icon} alt="search_icon" className='md:w-auto w-10 px-3'/>
        <input onChange={e=> setInput(e.target.value)} type="text" placeholder='search for the course' className='w-full h-full utline-none text-gray-500/80'/>
        <button type='submit' className='bg-blue-600 rounded text-shadow-white md:px-10 px-7 md:py-3 py-2 mx-1'> Search</button>
      </form>
    </div>
  );
};

export default SearchBar;

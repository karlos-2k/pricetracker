"use client"

import React, { FormEvent, isValidElement, useState } from 'react'

const isValidAmazonProductLink = (url: string) => {
  try{
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;

    if(hostname.includes('amazon.com') || 
       hostname.includes('amazon.') ||
       hostname.endsWith('amazon') ){
        return true;
      }
    }
    catch(error){
      return false;
    }
    return false;
  }

const Searchbar = () => {
  const [searchPrompt, setSearchPrompt] = useState('');
  const [isLoading, setisLoading] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValidLink = isValidAmazonProductLink(searchPrompt);

    if(!isValidLink) return
      alert('Please enter a valid Amazon product link');
    
    try{
      setisLoading(true); 
    }catch(error){
        console.error(error);
    } finally{
      setisLoading(false);
    }
  }

  return (
    <form 
      className="p-4"
      onSubmit={handleSubmit}
    >
      <input 
        type="text"
        value={searchPrompt}
        onChange={(e) => setSearchPrompt(e.target.value)}
        placeholder='Enter product link'
        className="w-3/4 sm:flex-1 flex-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
      />

      <button 
        type='submit' 
        className="px-6 py-2 bg-black text-white font-semibold rounded-lg hover:bg-red-600 transition duration-300"
        disabled={searchPrompt === ''}
      >
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </form>
  )
}

export default Searchbar

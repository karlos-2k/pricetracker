"use client"

import { scrapeAndStoreProduct } from '@/lib/actions';
import React, { FormEvent, isValidElement, useState } from 'react'

// Utility function to validate Amazon product URLs
// Returns true if the URL is a valid Amazon product link
const isValidAmazonProductLink = (url: string) => {
  try{
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;

    // Check if the hostname contains amazon domain variations
    if(hostname.includes('amazon.com') || 
       hostname.includes('amazon.') ||
       hostname.endsWith('amazon') ){
        return true;
      }
    }
    catch(error){
      return false; // Return false if URL parsing fails
    }
    return false;
  }

// Searchbar component for product URL input and submission
const Searchbar = () => {
  // State management for input value and loading state
  const [searchPrompt, setSearchPrompt] = useState('');
  const [isLoading, setisLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate the entered Amazon product link
    const isValidLink = isValidAmazonProductLink(searchPrompt);

    if(!isValidLink) return
      alert('Please enter a valid Amazon product link');
    
    try{
      setisLoading(true); 

      // Initiate web scraping for the product details
      const product = await scrapeAndStoreProduct(searchPrompt);
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
      {/* Product URL input field */}
      <input 
        type="text"
        value={searchPrompt}
        onChange={(e) => setSearchPrompt(e.target.value)}
        placeholder='Enter product link'
        className="w-3/4 sm:flex-1 flex-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
      />

      {/* Search submit button with loading state */}
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

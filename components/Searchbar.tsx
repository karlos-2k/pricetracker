"use client"

import React from 'react'

const Searchbar = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Add logic to handle the submitted URL here
    console.log("Form submitted")
  }

  return (
    <form 
      className="p-4"
      onSubmit={handleSubmit}
    >
      <input 
        type="text"
        placeholder='Enter product link'
        className="w-3/4 sm:flex-1 flex-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
      />

      <button 
        type='submit' 
        className="px-6 py-2 bg-black text-white font-semibold rounded-lg hover:bg-red-600 transition duration-300"
      >
        Search
      </button>
    </form>
  )
}

export default Searchbar

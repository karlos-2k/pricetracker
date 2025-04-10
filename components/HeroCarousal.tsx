"use client"

import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from "next/image";

const heroImages = [
  { imgUrl: 'assets/images/hero-1.svg', alt: 'smartwatch'},
  { imgUrl: 'assets/images/hero-2.svg', alt: 'bag'},
  { imgUrl: 'assets/images/hero-3.svg', alt: 'lamp'},
  { imgUrl: 'assets/images/hero-4.svg', alt: 'air fryer'},
  { imgUrl: 'assets/images/hero-5.svg', alt: 'chair'},

]

const HeroCarousal = () => {
  return (
    <div className="max-w-sm mx-auto">
      <Carousel
        showThumbs={false}
        showStatus={false}
        autoPlay
        infiniteLoop={true} 
        interval={2000}
        showArrows={false}
        swipeable
        emulateTouch
        dynamicHeight={false}
        >
        {heroImages.map((image) => (
          <div key={image.alt} className="bg-gray-200 p-6 rounded-xl flex items-center justify-center h-full">
            <Image 
              src={image.imgUrl}
              alt={image.alt}
              width={484}
              height={484}
              className="object-contain"
              key={image.alt}
            />
          </div>
        ))}
      </Carousel>
      
      {/* <Image 
        src="/assets/icons/hand-drawn-arrow.svg"
        alt="arrow"
        width={200}
        height={200}
        className="max-xl:hidden absolute -left-[15%] -bottom-0 z-0"
        priority
      /> */}
    </div>
  )
}

export default HeroCarousal
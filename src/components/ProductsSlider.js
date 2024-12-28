import React, { useState, useEffect } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';

export default function App() {
  const slides = [
    {
      url: require('../images/image1.jpg'),
    },
    {
      url: require('../images/image2.jpg'),
    },
    {
      url: require('../videos/backGroundVideo.gif'),
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  // Auto sliding effect
  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [currentIndex]);

  return (
    <div className='w-full relative group' style={{ height: "60vh" }}>
      <div
        className='w-full h-full bg-center bg-cover duration-500'
        style={{ backgroundImage: `url(${slides[currentIndex].url})`, objectFit: 'contain' }}
      ></div>
      {/* Left Arrow */}
      <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      {/* Right Arrow */}
      <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
      {/* Dots Navigation */}
      <div className='flex top-4 justify-center py-2'>
        {slides.map((_, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className='text-2xl cursor-pointer'
          >
            <RxDotFilled className={`text-${slideIndex === currentIndex ? 'white' : 'gray-500'}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

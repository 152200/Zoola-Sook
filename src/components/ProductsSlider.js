import React, { useState, useEffect, useCallback } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';

export default function ProductsSlider() {
  const slides = [
    {
      url: require('../images/image1.jpg'),
      alt: 'Slide 1',
      title: 'First Collection'
    },
    {
      url: require('../images/image2.jpg'),
      alt: 'Slide 2',
      title: 'Summer Collection'
    },
    {
      url: require('../videos/backGroundVideo.gif'),
      alt: 'Slide 3',
      title: 'New Arrivals'
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Memoize navigation functions to prevent unnecessary re-renders
  const prevSlide = useCallback(() => {
    setCurrentIndex(current => 
      current === 0 ? slides.length - 1 : current - 1
    );
  }, [slides.length]);

  const nextSlide = useCallback(() => {
    setCurrentIndex(current => 
      current === slides.length - 1 ? 0 : current + 1
    );
  }, [slides.length]);

  const goToSlide = useCallback((slideIndex) => {
    setCurrentIndex(slideIndex);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevSlide, nextSlide]);

  // Auto sliding effect with pause on hover
  useEffect(() => {
    if (!isAutoPlaying) return;

    const intervalId = setInterval(nextSlide, 3000);
    return () => clearInterval(intervalId);
  }, [isAutoPlaying, nextSlide]);

  return (
    <div 
      className='max-w-full relative group'
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Main Slider Container */}
      <div className='relative h-[30vh] sm:h-[40vh] md:h-[50vh] lg:h-[60vh] w-full overflow-hidden'>
        {/* Slide Image/Video */}
        <div
          className='w-full h-full bg-center bg-cover duration-500 ease-in-out transform transition-all'
          style={{ 
            backgroundImage: `url(${slides[currentIndex].url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
          role="img"
          aria-label={slides[currentIndex].alt}
        >
          {/* Optional Overlay Text */}
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
            <h2 className="text-white text-2xl md:text-4xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {slides[currentIndex].title}
            </h2>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          className='hidden group-hover:block absolute top-1/2 left-4 -translate-y-1/2 text-2xl rounded-full p-2 bg-black/30 text-white cursor-pointer hover:bg-black/50 transition-all duration-200'
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <BsChevronCompactLeft size={25} />
        </button>
        <button
          className='hidden group-hover:block absolute top-1/2 right-4 -translate-y-1/2 text-2xl rounded-full p-2 bg-black/30 text-white cursor-pointer hover:bg-black/50 transition-all duration-200'
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <BsChevronCompactRight size={25} />
        </button>
      </div>

      {/* Dots Navigation */}
      <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 grid grid-cols-3 gap-4 w-24'>
        {slides.map((_, slideIndex) => (
          <button
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`
              w-3 h-3 
              rounded-full 
              transition-all 
              duration-300 
              shadow-md
              border-2
              border-white/50
              place-self-center
              ${
                slideIndex === currentIndex 
                  ? 'bg-white scale-125 border-white' 
                  : 'bg-white/30 hover:bg-white/50 hover:scale-110'
              }
            `}
            aria-label={`Go to slide ${slideIndex + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-300">
        <div 
          className="h-full bg-white transition-all duration-300"
          style={{ 
            width: `${((currentIndex + 1) / slides.length) * 100}%` 
          }}
        />
      </div>
    </div>
  );
}

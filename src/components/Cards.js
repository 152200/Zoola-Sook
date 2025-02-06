import ProductCard from "../partials/ProductCard";
import React, { useState, useEffect } from "react";
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Cards({props}) {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };

    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Function to create slides for larger screens (4 products)
  const createSlides = (products) => {
    if (!products) return [];
    const slides = [];
    for (let i = 0; i < products.length && slides.length < 5; i += 4) {
      slides.push(products.slice(i, i + 4));
    }
    return slides;
  };

  // Function to create slides for smaller screens (2 products)
  const createSlidesSmall = (products) => {
    if (!products) return [];
    const slides = [];
    for (let i = 0; i < products.length && slides.length < 10; i += 2) {
      slides.push(products.slice(i, i + 2));
    }
    return slides;
  };

  const slides = props.products ? createSlides(props.products) : [];
  const slidesSmall = props.products ? createSlidesSmall(props.products) : [];

  return (
    <Swiper
      modules={[Navigation, Pagination, A11y, Autoplay]}
      spaceBetween={20}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      className="py-4 mx-auto"
      loop={true}
      loopFillGroupWithBlank={true}
      speed={750}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      }}
    >
      {slides.length > 0 ? (
        isLargeScreen ? slides.map((pair, slideIndex) => (
          <SwiperSlide key={slideIndex}>
            <div className="grid grid-cols-4 gap-2 sm:gap-4 px-2 sm:px-4">
              {pair.map((product, index) => (
                <ProductCard 
                  key={product._id || index} 
                  props={{product: product}}
                />
              ))}
            </div>
          </SwiperSlide>
        )) : slidesSmall.map((pair, slideIndex) => (
          <SwiperSlide key={slideIndex}>
            <div className="grid grid-cols-2 gap-2 sm:gap-4 px-2 sm:px-4">
              {pair.map((product, index) => (
                <ProductCard 
                  key={product._id || index} 
                  props={{product: product}}
                />
              ))}
            </div>
          </SwiperSlide>
        ))
      ) : (
        // Fallback with just one slide containing two cards
        <SwiperSlide>
          <div className="grid grid-cols-2 gap-2 sm:gap-4 px-2 sm:px-4">
            <ProductCard />
            <ProductCard />
          </div>
        </SwiperSlide>
      )}
    </Swiper>
  );
}



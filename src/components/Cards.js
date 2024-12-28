import ProductCard from "../partials/ProductCard";
import React from "react";
import { Navigation, Pagination, Scrollbar, A11y, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade'; // Importing the fade effect styles

export default function Cards({props}){

  

  return (
    <Swiper
     // install Swiper modules
     modules={[Navigation, Pagination, Scrollbar, A11y]}
     spaceBetween={50}
     slidesPerView={3}
     navigation
     pagination={{ clickable: true }}
     scrollbar={{ draggable: true }}
     breakpoints={{
      1024: {
        slidesPerView: 4, // Show 3 cards on large screens
      },
      640: {
        slidesPerView: 2, // Show 2 cards on medium screens
      },
      480: {
        slidesPerView: 1, // Show 1 card on small screens
      },
      50: {
        slidesPerView: 1, // Show 1 card on small screens
      },
    }}
  >
    {props.products? props.products.map((element)=>{
      return(<SwiperSlide><ProductCard props={{product: element}}/></SwiperSlide>)
    }): 
    
    <>
    
    <SwiperSlide><ProductCard/></SwiperSlide>
    <SwiperSlide><ProductCard/></SwiperSlide>
    <SwiperSlide><ProductCard/></SwiperSlide>
    <SwiperSlide><ProductCard/></SwiperSlide>
    <SwiperSlide><ProductCard/></SwiperSlide>
    </>

    }
    
    ...
  </Swiper>
  );
}

import React from "react";
import "../components/components.css";
import gucci1 from "../images/gucci1.jpg";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, addToFavorites } from '../app/features/cartSlice';
import { swipeState, productDetails } from '../app/features/modalSlice';
import { toast } from 'react-toastify';

function MakeCard(source, props) {
  const order = useSelector((state) => state.order.orderitems);
  const dispatch = useDispatch();

  function isCartContain(item) {
    return order.some(element => element.product.name === item.product.name);
  }

  const HandleAddToCart = async () => {
    const orderitem = {
      quantity: 1,
      product: props.product,
    }
    if (!isCartContain(orderitem)) {
      dispatch(addToCart(orderitem));
    } else {
      toast.info("هذا العنصر موجود في السلة");
    }
  }

  const HandleAddToFavorites = () => {
    dispatch(addToFavorites(props.product));
  }

  if (!props) {
    return (
      <div className="bg-gray-200 animate-pulse rounded-lg h-[260px] sm:h-[200px] md:h-[380px] lg:h-[420px] w-full relative">
        <div className="absolute bottom-1 sm:bottom-2 left-1/2 transform -translate-x-1/2 flex justify-center items-center gap-1.5 sm:gap-2 w-full px-1 sm:px-4">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="h-8 w-8 sm:h-7 sm:w-7 md:h-10 md:w-10 lg:h-12 lg:w-12 bg-gray-300 rounded-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-center bg-no-repeat bg-cover group rounded-lg h-[260px] sm:h-[200px] md:h-[380px] lg:h-[420px] w-full cursor-pointer relative" 
         style={{
           backgroundImage: `url(${props ? props.product.image : gucci1})`
         }}>
      <div className="absolute bottom-1 sm:bottom-2 left-1/2 transform -translate-x-1/2 flex justify-center items-center gap-1.5 sm:gap-2 w-full px-1 sm:px-4 
                      sm:opacity-0 sm:group-hover:opacity-100 opacity-100 transition-all duration-300">
        <button
          className="icon h-8 w-8 sm:h-7 sm:w-7 md:h-10 md:w-10 lg:h-12 lg:w-12 bg-white/90 rounded-full shadow-lg duration-300 hover:bg-violet-800 cursor-pointer"
          onClick={() => {
            dispatch(swipeState());
            dispatch(productDetails(props.product));
          }}
        >
          <i className="fa-regular fa-eye transform duration-200 hover:scale-125 hover:text-white text-sm sm:text-xs md:text-base"></i>
        </button>
        <button 
          onClick={HandleAddToCart}
          className="icon h-8 w-8 sm:h-7 sm:w-7 md:h-10 md:w-10 lg:h-12 lg:w-12 bg-white/90 rounded-full shadow-lg duration-300 hover:bg-violet-800 cursor-pointer"
        >
          <i className="fa-solid fa-bag-shopping hover:scale-125 duration-200 hover:text-white text-sm sm:text-xs md:text-base"></i>
        </button>
        <button 
          className="icon h-8 w-8 sm:h-7 sm:w-7 md:h-10 md:w-10 lg:h-12 lg:w-12 bg-white/90 rounded-full shadow-lg duration-300 hover:bg-violet-800 cursor-pointer"
          onClick={HandleAddToFavorites}
        >
          <i className="fa-solid fa-heart hover:scale-125 duration-200 hover:text-white text-sm sm:text-xs md:text-base"></i>
        </button>
      </div>
    </div>
  );
}

function makeSliderItem(source, props) {
  return (
    <div className="w-full px-1 sm:px-2 cursor-pointer">
      {MakeCard(source, props)}
      {props ? (
        <div className="text-center mt-1 sm:mt-4">
          <h6 className="text-sm sm:text-lg font-semibold truncate">{props.product.name}</h6>
          <span className="text-gray-800 text-xs sm:text-base">{props.product.price} شيكل</span>
        </div>
      ) : (
        <div className="text-center mt-1 sm:mt-4">
          <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-24 mx-auto"></div>
        </div>
      )}
    </div>
  );
}

export default function ProductCard({props}) {
  return (
    <div className="w-full">
      {makeSliderItem(gucci1, props)}
    </div>
  );
}
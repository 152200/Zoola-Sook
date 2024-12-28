import React, {  useState } from 'react';
import { useLocation } from 'react-router-dom';
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import TopBar from '../top-bar';
import Footer from '../Footer';
import { FcPlus } from "react-icons/fc";
import { HiMinusCircle } from "react-icons/hi";
import { CiHeart } from "react-icons/ci";
import NewArrivals from "../../partials/NewArrivals"
import {addToCart, addToFavorites, isCartContain} from '../../app/features/cartSlice'
import { useDispatch, useSelector } from 'react-redux';
import {toast} from 'react-toastify';
const ProductDisplay = () => {

  const order = useSelector((state) => state.order.orderitems);



  const location = useLocation();
  const { product } = location.state || {};
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage]  = useState(product?product.image:'');


  function isCartContain(item){
    
    const exists = order.some(element => element.product.name === item.product.name);
    return exists; // Returns true if item is not in cart, false if it is
  }

  // redux part
const dispatch = useDispatch();

const HandleAddToCart = ()=>{
 
  const orderitem = {
    quantity:quantity,
    product:product,
  }
  if(!isCartContain(orderitem)){
    dispatch(addToCart(orderitem));
    }
    else{
      toast.info("هذا العنصر موجود في السلة");
    }
}


const HandleAddToFavorites = ()=>{
  
    dispatch(addToFavorites(product));
}


 function imageGallery(product){
  return (
    <div className="flex flex-col lg:flex-row gap-4 justify-between p-4" style={{ height: "100vh" }}>
      <div className='flex-1 h-auto'>
        <InnerImageZoom 
          zoomPreload={true} 
          className="h-full rounded-lg w-full shadow-lg" 
          src={mainImage} 
          alt="Product Main"
        />
      </div>
      <div className="flex flex-col gap-4 w-full lg:w-1/3">
        {/* Dynamically generate the gallery images */}
        {product ? (
          product.images.map((imgSrc, index) => (
            <div key={index} className='w-full'>
              <img
                className="h-24 w-full object-cover rounded-lg cursor-pointer transition-transform transform hover:scale-105"
                src={imgSrc}
                alt={`product-${index}`}
                onClick={() => setMainImage(imgSrc)}
              />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No images available</p>
        )}
      </div>
    </div>
  );
 }


  
  return (
    <div>
      <TopBar/>
      <div className="flex flex-col lg:flex-row items-start p-6 bg-white m-6 gap-3">
        <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
        {   imageGallery(product)}
        </div>
        {/* Product Details */}
        <div className="w-full lg:w-1/2 lg:pl-6">
          <h1 className="text-2xl font-bold mb-4">{product?product.name:"مارك جاكوبس توت باج كبيرة"}</h1>
          <p className="text-xl text-blue-600 font-semibold mb-4">السعر: {product?product.price:"0"} شيكل</p>
          {/* <div className="mb-6">
            <label className="flex items-center mb-2 gap-2">
              <input type="checkbox" className="form-checkbox h-5 w-5 text-pink-500" />
              <span className="ml-2">تغليف شفاف مع شبرة - 5.00 شيكل</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="form-checkbox h-5 w-5 text-pink-500" />
              <span className="ml-2">تغليف ورقي مع شبرة - 15.00 شيكل</span>
            </label>
          </div> */}
          <textarea
            placeholder="في حال لديك ملاحظات خاصة للبائع"
            className="w-full border border-gray-300 rounded-md p-3 mb-4"
          />
          <div className="flex gap-4 justify-start items-center flex-wrap">
            <button className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors duration-200" onClick={()=>{HandleAddToCart()}}>
              أضف إلى عربة التسوق
            </button>
            <div className="flex gap-4 justify-center items-center">
              <button onClick={() => setQuantity(quantity + 1)}>
                <FcPlus className="w-6 h-6" />
              </button>
              <input
                type="text"
                value={quantity}
                className="border-4 w-16 h-16"
                placeholder="العدد"
                readOnly
              />
              <button onClick={() =>{ if(quantity>0){setQuantity(quantity - 1);}}}>
                <HiMinusCircle className="w-6 h-6" />
              </button>
            </div>
            <button className="flex border-2 rounded-full mr-6 w-14 h-14 justify-center items-center hover:text-red-600 hover:border-red-600" onClick={()=>HandleAddToFavorites()}>
              <CiHeart className="w-6 h-6" />
            </button>
            <p className="text-gray-600 mt-4">الشحن خلال 3 - 4 أيام عمل</p>
          </div>
        </div>
      </div>

      <br /><br /> <br/>
            <br/>
            <br/>
            <br/>
      <div className="bg-gray-100 py-4">
        <div className="flex justify-center items-center space-x-8">
          <button className="text-gray-700 font-medium hover:text-black focus:text-black focus:outline-none">
            التقييمات
          </button>
          <button className="text-gray-700 font-medium hover:text-black focus:text-black focus:outline-none">
            سياسة إلغاء الطلب
          </button>
          <button className="text-gray-700 font-medium hover:text-black focus:text-black focus:outline-none">
            سياسة الشحن والإرجاع
          </button>
        </div>
      </div>

      <br /><br />
      <NewArrivals />
      <Footer />
    </div>
  );
};

export default ProductDisplay;

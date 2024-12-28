
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { CiSquarePlus } from "react-icons/ci";

import { FaRegHeart, FaMinus} from "react-icons/fa";
import {FiPlus} from 'react-icons/fi'
import './components.css'
import image1 from '../images/gucci1.jpg'
import { Link } from 'react-router-dom';

export default function ProductDetails ({ match }) {
//   const [product, setProduct] = useState(null);
//   const productId = match.params.id;

//   useEffect(() => {
//     // Fetch product data from an API
//     axios.get(`https://api.example.com/products/${productId}`)
//       .then(response => {
//         setProduct(response.data);
//       })
//       .catch(error => {
//         console.error('There was an error fetching the product data!', error);
//       });
//   }, [productId]);

//   if (!product) {
//     return <div>Loading...</div>;
//   }

  return (
    <div class="flex flex-col md:flex-row bg-card gap-4 fixed w-full md:w-1/2 p-4 md:justify-center md:flex-wrap overflow-auto ">
  {/* <!-- Image container --> */}
  <div class="w-full sm:w-auto h-auto md:h-full">
    <img src={image1} alt="Product Images" class="w-full rounded-lg" />
  </div>
  
  {/* <!-- Content container --> */}
  <div class="w-full md:w-1/2 md:pl-4">
    <Link to="/product">
      <h2 class="text-xl font-bold text-foreground hover:text-violet-700 whitespace-normal">
        جوتشي + بالنسيتاغا hourglass قاعدة 23 سم
      </h2>
    </Link>
    
    <p class="text-lg text-primary mt-2">150.00 شيكل</p>
    
    <p class="text-muted-foreground mt-4">
      Go kalles this summer with this vintage navy and white striped v-neck t-shirt from Nike. Perfect for pairing with denim and white kicks for a stylish kalles vibe.
    </p>

    {/* <!-- Quantity control and buttons -->/ */}
    <div class="flex items-center mt-4 flex-wrap gap-2">
      <button class="text-secondary-foreground hover:bg-secondary/80 p-2 rounded-lg">
        <FaRegHeart className="w-7 h-7"/>
      </button>
      <button class="text-secondary-foreground hover:bg-secondary/80 p-2 rounded-lg">
        <CiSquarePlus className="w-7 h-7"/>
      </button>
      <input type="number" value="1" class="border border-border rounded-lg w-16 text-center" />
      <button class="text-secondary-foreground hover:bg-secondary/80 p-2 rounded-lg">
        <FaMinus className="w-7 h-7"/>
      </button>
      <button class="text-secondary-foreground hover:bg-secondary/80 p-2 rounded-lg">
        <FiPlus className="w-7 h-7"/>
      </button>
    </div>

    {/* <!-- Buy Now button --> */}
    <button class="bg-primary text-primary-foreground hover:bg-primary/80 mt-4 p-2 rounded-lg w-full">
      اشترِ الآن
    </button>

    {/* <!-- Additional Information --> */}
    <div class="mt-4">
      <h3 class="text-lg font-semibold">إسأل سؤال</h3>
      <p class="text-muted-foreground">التفاصيل: المحفوظات.</p>
      <p class="text-muted-foreground">الأقسام: Home page, بالنسيتاغا, جوتشي.</p>
      <p class="text-muted-foreground">فئات: حقائب, حقائب صغيرة.</p>
      <p class="text-muted-foreground">شعبات: كروسبي.</p>
    </div>

    {/* <!-- Social Buttons --> */}
    <div class="flex mt-4 gap-3 flex-wrap">
      <button class="bg-green-500 text-white hover:bg-green-600 p-2 rounded-lg">WhatsApp</button>
      <button class="bg-blue-800 text-white hover:bg-blue-900 p-2 rounded-lg ml-2">فيسبوك</button>
    </div>
  </div>
</div>

  );
};



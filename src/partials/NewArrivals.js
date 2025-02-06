import React, {useState, useEffect} from 'react'
import ProductCard from './ProductCard';
import axios from 'axios';
import {toast} from 'react-toastify';
import { API_BASE_URL } from '../config/api';

export default function NewArrivals(){
const [products, setProducts] = useState([])


async function getAllProducts(){
  try {
      const res  = await axios.get(`${API_BASE_URL}/products`)
      
      // Sort products by date (newest first) and take first 4
      const sortedProducts = res.data
        .sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated))
        .slice(0, 4);
      
      setProducts(sortedProducts)
    
  } catch (error) {
      toast.error(error.message)
  }
}

useEffect(()=>{getAllProducts()},[])


return(
    <div className="px-3 sm:px-4 md:px-6 lg:px-8">
        <br />
        <br />
        <div className='flex justify-center'>
            <span className='text-4xl'>وصل جديدا</span>
        </div>
        <br />
        <br />
        <hr className='font-bold'/>
        <br />
        <br />
        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6'>
            {products.length !== 0 
                ? products.map((element) => (
                    <ProductCard key={element._id} props={{product:element}}/>
                  ))
                : <>
                    <ProductCard/>
                    <ProductCard/>
                    <ProductCard/>
                    <ProductCard/>
                  </>
            }
        </div>
    </div>
);
}
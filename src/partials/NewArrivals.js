import React, {useState, useEffect} from 'react'
import ProductCard from './ProductCard';
import axios from 'axios';
import {toast} from 'react-toastify';

export default function NewArrivals(){
const [products, setProducts] = useState([])


async function getAllProducts(){
  try {
      const res  = await axios.get('https://zola-backend-q9aq.onrender.com/products')
      
      setProducts(res.data)
    
  } catch (error) {
      toast.error(error.message)
  }
}

useEffect(()=>{getAllProducts()},[])


return(
<div>
<br />
<br />
<div className='flex justify-center'>
  <span className=' text-4xl'>وصل جديدا</span>
</div>
<br />
<br />
<hr className='font-bold'/>
<br />
<br />
<div className='grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 lg:w-7/8 gap-7 mx-auto px-8 md:grid-cols-2 md:gap-8 align-middle'>
{products.length!==0?
products.map((element)=>{
  return (
    <ProductCard props={{product:element}}/>
  )
})
: <>
  <ProductCard/>
  <ProductCard/>
  <ProductCard/>
  <ProductCard/>
</>}
</div></div>);}
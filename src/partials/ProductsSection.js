import React from 'react'
import ProductCard from './ProductCard'
import NewArrivals from './NewArrivals'

export default function ProductsSection({props}){
    return(
        <div>
            <div className='grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 lg:w-7/8 gap-7 mx-auto px-8 md:grid-cols-2 md:gap-8 align-middle' style={{marginTop:"2.5rem", alignItems:"center" }}>
            {
            props!==undefined&&
            props.category.map((element)=>{
            
            return(
              <ProductCard props={{product:element}}/>
             );
           
          })}
            {
                props == undefined &&
                    
                 <>
                   <ProductCard/>
                   <ProductCard/>
                   <ProductCard/>
                   <ProductCard/>
                   <ProductCard/>
                   <ProductCard/>
                   <ProductCard/>
                 </>
           
            }
        </div>
        <NewArrivals/>
        </div>
    );
}
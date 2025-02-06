import React from 'react'
import ProductCard from './ProductCard'
import NewArrivals from './NewArrivals'

export default function ProductsSection({props}){
    return(
        <div className="px-3 sm:px-4 md:px-6 lg:px-8">
            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6' 
                 style={{marginTop:"2.5rem"}}>
                {props !== undefined &&
                    props.category.map((element) => (
                        <ProductCard key={element._id} props={{product:element}}/>
                    ))
                }
                {props == undefined && 
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
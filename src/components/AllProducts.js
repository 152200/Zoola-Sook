import React from 'react';
import './components.css';
import ProductsSection from '../partials/ProductsSection'

export default function AllProducts({props}){
    return(
        <div>
            <div className="pic-title-desc">
        
        <h2 className="text-black font-bold ">منتجاتنا</h2> 
        <br/>
        <hr/>
        <br/>
        <ProductsSection props={{category:props.products}}/>
    </div>
        </div>
    );
}
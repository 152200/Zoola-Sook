import React from 'react'
import TopBar from '../components/top-bar';
import BrandsBar from '../partials/BrandsBar'
import ProductsSection from '../partials/ProductsSection.js'
import Footer from '../components/Footer.js'
import { useSelector } from 'react-redux';

export default function FavoritesPage(){

    const favorites = useSelector((state) => state.order.favorites);

    return (<div>
        <TopBar/>
        <div className="h-[220px] bg-center bg-no-repeat bg-cover flex items-center justify-center" style={{fontFamily:"Tajwal",fontSize:"2.25rem",color:"white",backgroundImage: "url('https://wallpapercave.com/dwp1x/wp2415539.jpg')"}}>
        العناصر المفضلة
        </div> 
        <BrandsBar/>
        <hr />
        <ProductsSection  props={{category:favorites}}/>
        <Footer/>
    </div>);

}
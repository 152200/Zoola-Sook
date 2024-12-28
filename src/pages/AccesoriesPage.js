import React ,{useState,useEffect}from 'react'
import TopBar from '../components/top-bar';
import BrandsBar from '../partials/BrandsBar'
import ProductCard from '../partials/ProductCard';
import Footer from '../components/Footer.jsx'
import ProductsSection from '../partials/ProductsSection.js';
import {toast} from 'react-toastify';
import axios from 'axios';

export default function AccesoriesPage() {
    const[products, setProducts] = useState([]);

    async function getAllProducts(){
        try {
            const res  = await axios.get('https://zola-backend-q9aq.onrender.com/products')
            let preProducts = [];
            res.data.map((pro)=>{
                if(pro.category==="أكسسوارات وشالات")
                    preProducts.push(pro);
            })
            setProducts(preProducts)
          
        } catch (error) {
            toast.error(error.message)
        }
    }
    useEffect(()=>{getAllProducts()},[])

    return(
        <div>
        <TopBar/>
        {/* background and the name of section */}
        <div className="h-[220px] bg-center bg-no-repeat bg-cover flex items-center justify-center" style={{fontFamily:"Tajwal",fontSize:"2.25rem",color:"white",backgroundImage: "url('https://png.pngtree.com/thumb_back/fh260/background/20230408/pngtree-rainbow-curves-abstract-colorful-background-image_2164067.jpg')"}}>
        إكسسوارات
        </div>
        <BrandsBar/>
        <hr />
        <ProductsSection props={{category:products}}/>
        <Footer/>
        </div>
    );
}
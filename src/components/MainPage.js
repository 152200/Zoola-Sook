import React ,{useEffect, useState}from 'react'
import TopBar from './top-bar';
import ProductsSlider from './ProductsSlider';
import Cards from './Cards'
import Footer from './Footer.js'
// import BrandsSlider from './BrandsSlider';
import AllProducts from './AllProducts.js';
import axios from 'axios';
import {toast} from 'react-toastify';
import { Link, Element } from 'react-scroll';
import { API_BASE_URL } from '../config/api.js';


export default function MainPage(){

  const sections = ['section1', 'section2', 'section3'];

  useEffect(() => {
    // Function to scroll to sections
    const scrollToSections = async () => {
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          // Scroll smoothly to the section
          element.scrollIntoView({ behavior: 'smooth' });
          // Wait for a specified time before scrolling to the next section
          await new Promise(resolve => setTimeout(resolve, 2000)); // Adjust the time as needed
        }
      }
    };

    scrollToSections();
  }, [sections]); // Dependencies to run effect on mount


  const[producto, setProducto] = useState([]);

  async function getAllProducts(){
      try {
          const res  = await axios.get(`${API_BASE_URL}/products`)
       
          setProducto(res.data)
        
      } catch (error) {
          toast.error(error.message)
      }
  }

 useEffect(()=>{getAllProducts()},[])

    return(
        
        
     <div className="scroll-smooth"> 
        <TopBar/>
       <ProductsSlider id="section1"/>  
        <br />
        <br />
        {/* <BrandsSlider/> */}
        <br />
        <br />
      <Cards props={{products:producto}} id="section2"/> 
       <br />
      <br />
      <br />
      <AllProducts props={{products:producto}} id="section3"/>
      <br/>
      <br/>
      <br/>
        <Footer/> 
     </div>
     
   );
        
    
}
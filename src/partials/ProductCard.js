import React from "react";
import "../components/components.css";
import gucci1 from "../images/gucci1.jpg";
import { useState } from "react";
import { useDispatch,useSelector} from 'react-redux';
import {addToCart, addToFavorites} from '../app/features/cartSlice';
import {swipeState, productDetails} from '../app/features/modalSlice';
import {toast} from 'react-toastify';


function MakeCard(source, props) {
 

  const order = useSelector((state) => state.order.orderitems);
  const modalState = useSelector((state)=> state.modal.modalState);
  
  function isCartContain(item){
    
    const exists = order.some(element => element.product.name === item.product.name);
    return exists; // Returns true if item is not in cart, false if it is
  }
 
  // redux part
  const dispatch = useDispatch();

  const HandleAddToCart = async ()=>{
   
    const orderitem = {
      quantity:1,
      product:props.product,
    }
      if(!isCartContain(orderitem)){
      dispatch(addToCart(orderitem));
      }
      else{
        toast.info("هذا العنصر موجود في السلة");
      }
      
  }


  const HandleAddToFavorites = ()=>{
    
      dispatch(addToFavorites(props.product));
  }

  const [showModal, setShowModal] = useState(false);
  return (
    <div className="regular-card bg-center bg-no-repeat bg-cover group rounded-lg" onMouseEnter={()=>{}} style={{position:"relative", backgroundImage:`url(${props?props.product.image:gucci1})`}}>
      <div className="gap-1 absolute bottom-5 lg:w-0 mx-auto flex justify-between items-center z-10 group-hover:w-1/2 overflow-hidden transition-all duration-300 md:w-1/2 ">
        <button
         className="icon h-12 w-12 duration-500 hover:bg-violet-800 hover:animate-pulse"
             onClick={() => {
                //  setShowModal(!showModal);
                 dispatch(swipeState());
                 dispatch(productDetails(props.product));
           }}
        >
        <i
           className="fa-regular fa-eye transform duration-200 hover:scale-125 hover:text-white"
          style={{ cursor: "pointer" }}
         ></i>
        </button>
        <button onClick={()=>HandleAddToCart()}className="icon h-12 w-12  hover:bg-violet-800 hover:animate-pulse">
          <i class="fa-solid fa-bag-shopping hover:scale-125 duration-200  hover:text-white " style={{ cursor: "pointer" }}></i>
        </button>
        <button className="icon h-12 w-12  hover:bg-violet-800 hover:animate-pulse" onClick={()=> HandleAddToFavorites()}>
          <i class="fa-solid fa-heart hover:scale-125 duration-200  hover:text-white " style={{ cursor: "pointer" }}></i>{" "}
        </button>
      </div>
            
        {/* {props!==undefined&&<Modal show={showModal} onClose={ () => {setShowModal(false)}} props={{product:props.product}}/>} */}
        {/* {props===undefined&&<Modal show={showModal} onClose={ () => {setShowModal(false)}} />}   */}
        

    </div>
  );
}
// return the div containing the image inside
function makeSliderItem(source,props) {
  return (
    <div className="d-block w-100% m-3">
      {MakeCard(source,props)}
      <br />
      <div className="pic-title-desc flex justify-center flex-col">
        {
          props!== undefined &&
          <>
          <h6 >{props.product.name}</h6>
          <span>{props.product.price}شيكل</span>
          </>
        }
        {
          props === undefined&&
         <>
          <h6 >حقيبة باربارا</h6>
          <span>70 شيكل</span>
         </>
        }
      </div>
    </div>
  );
}



export default function ProductCard({props}){
  
    return (
        <div className="w-80 m-auto" >
            {makeSliderItem(gucci1,props)}
        </div>
    );
}
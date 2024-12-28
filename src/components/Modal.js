import React ,{useState}from 'react';
import './Modal.css';
import { RiCloseLargeFill } from "react-icons/ri";
import { CiSquarePlus } from "react-icons/ci";
import { FaRegHeart, FaMinus} from "react-icons/fa";
import './components.css'
import image1 from '../images/gucci1.jpg'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux'
import {addToCart, addToFavorites} from '../app/features/cartSlice'
import {toast} from 'react-toastify';
import { swipeState } from '../app/features/modalSlice';



export default function Modal ({ show, children, onClose ,props}){


  const order = useSelector((state) => state.order.orderitems);



  const dispatch = useDispatch();

  function isCartContain(item){
    
    const exists = order.some(element => element.product.name === item.product.name);
    return exists; // Returns true if item is not in cart, false if it is
  }

  const HandleAddToCart = ()=>{
    const producto = {
      name:props.product.name,
      desc:"it is a meaningful thing to hava in your collection",
      image:"./favorite",
      images:[],
      brand:"gucci",
      price:props.product.price,
      discount:6,
      category:"women",
      rating:"",
    }
    const orderitem = {
      quantity:quantity,
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

  const [quantity, setQuantity] = useState(1);
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose} >
      < div className="overflow-auto modal-content flex flex-row gap-4 justify-center items-center flex-wrap sm:-mx-16`" onClick={e => e.stopPropagation()}  style={{height:"700px" }}>
        <button className="close-button" onClick={onClose}>
        <RiCloseLargeFill />
        </button>
      
   
    <img src={props?props.product.image:image1} alt="Product Images" class=" w-96 h-4/5 rounded-lg mt-5 " />
  
  <br/>
  <br/>
  
  <div class="w-full md:w-1/2 md:pl-4 mt-5">
    <Link 
    to={{
    pathname: "/product",
  }}
  state={{ product: props?.product }}  >
      <h2 
       onClick={()=>{dispatch(swipeState())}}
      class="text-xl font-bold text-foreground hover:text-violet-700 whitespace-normal">
        {props!==undefined? props.product.name :" جوتشي + بالنسيتاغا hourglass قاعدة 23 سم"}
      </h2>
    </Link>
    
    <p class="text-lg text-primary mt-2">{props!==undefined?props.product.price+" شيكل":"150.00 شيكل"}</p>
    
    <p class="text-muted-foreground mt-4">
      {props!==undefined?props.product.description:"Go kalles this summer with this vintage navy and white striped v-neck t-shirt from Nike. Perfect for pairing with denim and white kicks for a stylish kalles vibe."}
    </p>


    <div class="flex items-center  flex-wrap gap-2">
      <button class="text-secondary-foreground hover:bg-secondary/80 p-2 rounded-lg" onClick={HandleAddToFavorites}>
        <FaRegHeart className="w-7 h-7"/>
      </button>
      <button class="text-secondary-foreground hover:bg-secondary/80 p-2 rounded-lg">
        <CiSquarePlus className="w-7 h-7"onClick={()=>{setQuantity(quantity+1)}}/>
      </button>
      <input type="number" value={quantity} class="border border-border rounded-lg w-16 text-center" />
      <button class="text-secondary-foreground hover:bg-secondary/80 p-2 rounded-lg">
        <FaMinus className="w-7 h-7" onClick={()=>{if(quantity>0){setQuantity(quantity-1);}}}/>
      </button>
    </div>

  
    <button class="text-white hover:bg-blue-900 text-primary-foreground hover:bg-primary/80 mt-4 p-2 rounded-lg w-full bg-blue-800" onClick={()=>{HandleAddToCart()}}>
      أضف إلى السلة
    </button>

 
    <div class="mt-4">
      {/* <h3 class="text-lg font-semibold">إسأل سؤال</h3>
      <p class="text-muted-foreground">التفاصيل: المحفوظات.</p> */}
      <p class="text-muted-foreground">الأقسام: {props!==undefined?props.product.brand:"Home page, بالنسيتاغا, جوتشي."}</p>
      <p class="text-muted-foreground">فئات:{props?props.product.category:"نساء"}.</p>
      {/* <p class="text-muted-foreground">شعبات: كروسبي.</p> */}
    </div>


    <div class="flex mt-4 gap-3 flex-wrap">
      <button class="bg-green-500 text-white hover:bg-green-600 p-2 rounded-lg">WhatsApp</button>
      <button class="bg-blue-800 text-white hover:bg-blue-900 p-2 rounded-lg ml-2">فيسبوك</button>
    </div>
  </div>
     
      </div>  
    </div>
  );
};


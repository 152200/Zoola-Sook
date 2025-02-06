import "./components.css";
import logo from "../images/sameer-logo.png";
import "../all.min.css";
// import { click } from "@testing-library/user-event/dist/click";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import LastProducts from "../partials/LastProducts";
import image1 from '../images/gucci3.jpg'
import { IoPersonSharp } from "react-icons/io5";
import { FaOpencart } from "react-icons/fa6";
// import ShoppingCart from './ShoppingCart';
import {Context} from '../index.js'
import { FiAlignJustify } from "react-icons/fi";
import { TbLogout2 } from "react-icons/tb";
import {toast} from 'react-toastify'
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import CartItem from "../partials/CartItems.js";
import {deleteCart} from '../app/features/cartSlice'
import { API_BASE_URL } from "../config/api.js";

export default function TopBar() {



  const dispatch = useDispatch();
  
  const {isAuthenticated, setIsAuthenticated} = useContext(Context);

  const [totalPrice, setTotalPrice] = useState(0)

  const order = useSelector((state) => state.order.orderitems);

  const favorites = useSelector((state) => state.order.favorites);
  

  // calculating the total price 

  function totalPrico(){
    let newTotal = totalPrice;
    order.map((element)=>{
      newTotal = newTotal + element.quantity * element.product.price;
    })
    setTotalPrice(newTotal);
  }
  
    function HandleClickOnCart(){
    setTotalPrice(0);
    totalPrico();
    toggleSidebar();

  }

  // handling the logout 

  function HandleLogOut(){
    setIsAuthenticated(false);
    toast.success("تم تسجيل الخروج",{autoClose:5000})
  }

  // justify stock section start

  
  async function justifyStock(item,flag){
    try {
      // Fetch the latest product data to ensure we are working with up-to-date stock
      const productRes = await axios.get(`${API_BASE_URL}/products/${item.product._id}`);
      const latestProduct = productRes.data;
  
      if (!latestProduct) {
        toast.error("Product not found!");
        return;
      }
      
      // Update countInStock based on the latest product data

      const updatedStock = latestProduct.countInStock - item.quantity; 
      
      try {
        
      const response = await axios.put(`${API_BASE_URL}/products/${item.product._id}`, {
        name: latestProduct.name,
        description: latestProduct.description,
        richDescription: latestProduct.richDescription,
        image: latestProduct.image,
        images: latestProduct.images,
        brand: latestProduct.brand,
        price: latestProduct.price,
        discount: latestProduct.discount,
        category: latestProduct.category,
        countInStock: updatedStock,  // Restore stock here
        rating: latestProduct.rating,
        numReviews: latestProduct.numReviews,
        isFeatured: latestProduct.isFeatured,
        dateCreated: latestProduct.dateCreated
      });
      toast.success("تم تحديث المخزون بنجاح");
      } catch (error) {
          toast.error("Error updating stock: " + error.message);
      }
  
     
  
    } catch (error) {
        toast.error("Error updating stock: " + error.message);
    }
    
  }

 function handleDeleteCart(){
    dispatch(deleteCart());
  }


// justify stock section end


  // async function HandleBuyCart(){

  //    const ordero = {
  //     orderItems: order,
  //     user: JSON.parse(localStorage.getItem('email')),
  //   };

  //     if(isAuthenticated){
  //       try {
  //         const res = await axios.post(`${API_BASE_URL}/orders`,ordero);

  //         // console.log(res.status)
  //         if(res.status==200 || res.status==204){
  //           order.map((item)=>{
  //             justifyStock(item);
  //           })       
  //           dispatch(deleteCart());
  //           toast.success("عملية الشراء تمت بنجاح");
  //           const mail = await axios.post(`${API_BASE_URL}/webhook/whatsapp`,ordero)
  //         }
  //         else if(res.status==400){
  //             toast.error("لقد حدث أثناء عملية الشراء يرجى المحاولة لاحقا")
  //         }

  //       } catch (error) {
  //         toast.error(error.message)
  //       }
  //     }
      
  // }








  async function HandleBuyCart() {
    const email = JSON.parse(localStorage.getItem('user')); // Get user email from localStorage
  
    if (!email) {
      toast.error("User not found in localStorage");
      return;
    }
  
    try {
      // Fetch user from the database by email (this is a custom route you may need to create)
      const userResponse = await axios.get(`${API_BASE_URL}/users/email`, {
        params: { email: email } // Send email as a query parameter
      });
      
      const user = userResponse.data;
      toast.info(user);
      if (!user || !user._id) {
        toast.error("User not found in the database");
        return;
      }

      let productsToDB = order.map((item) => ({
        quantity: item.quantity,
        product: item.product._id  // Assuming you want only the product ID, you can adjust this based on your need
      }));
    
      // Prepare the order object with the fetched user ID (_id)
      const ordero = {
        orderItems: order,
        totalPrice: totalPrice,
        user: user._id, // Attach the user's _id from the database
      };
  
      
      if (isAuthenticated) {
        try {
          // Send the order to the server
          const res = await axios.post(`${API_BASE_URL}/orders`, {
            orderItems:productsToDB,
            shippingAddress1: user.street,
            shippingAddress2: user.apartment,
            city: user.street,
            zip: "P340-P379",
            country: "Palestine",
            phone: user.phone,
            totalPrice: totalPrice,
          });
  
          if (res.status === 200 || res.status === 204) {
            order.forEach((item) => {
              justifyStock(item); // Adjust stock levels after purchase
            });
            dispatch(deleteCart());
            toast.success("عملية الشراء تمت بنجاح");
  
            // Optionally send a WhatsApp notification after a successful order
            await axios.post(`${API_BASE_URL}/webhook/whatsapp`, ordero);
          } else if (res.status === 400) {
            toast.error("لقد حدث خطأ أثناء عملية الشراء يرجى المحاولة لاحقا");
          }
        } catch (error) {
          toast.error(error.message);
        }
      }
    } catch (error) {
      toast.error("Error fetching user: " + error.message);
    }
  }
  


  




  // some of tailwind preClasses
  const baritem = "text-black cursor-pointer bar-item"
  // handling the sidebar start
  const [display, setDisplay] = useState(false);
  const [smallScreen, setSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 800) {
        setSmallScreen(true);
      } else {
        setSmallScreen(false);
      }
    };

    // تحقق من حجم الشاشة عند تحميل المكون لأول مرة
    handleResize();

    // أضف مستمع لتغيير حجم الشاشة
    window.addEventListener("resize", handleResize);

    // تنظيف المستمع عند إلغاء تثبيت المكون
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const displaySwap = () => {
    if (display) {
      setDisplay(false);
    } else setDisplay(true);
  };
  const sideMenuStyle = {
    display: display ? "flex" : "none",
    position: "fixed",
    top: 0,
    left: 0,
    height: "100%",
    width: "20rem", // Tailwind w-80 is 20rem or 320px
    // backgroundColor: 'white',
    boxShadow:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    transform: "translate(0, 0)", // Adjust as needed
    transform: display ? "translateX(0)" : "translateX(100%)",
    transitionProperty: "transform",
    transitionDuration: "3000ms",
    transitionTimingFunction: "ease-in-out",
    zIndex: 40,
  };

  // handling the sidebar end

  // handling  last products start

  // handling  last products end

  //handling Shopping Cart start
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    if(totalPrice!==0)
    setTotalPrice(0);
  };
  // handling Shopping Cart end

  function listOfSections(identifier , classoName) {
    return (
      <div className={classoName}>
        
          {/* <Link className={identifier} to="/">
            آخر المنتجات
          </Link> */}
        
        {/* <li><Link className={identifier} to="/">حقائب</Link></li> */}
        
          <Link className={identifier} to="/Women">
            النساء
          </Link>
        
          <Link className={identifier} to="/Men">
            الرجال
          </Link>
        
          <Link className={identifier} to="/Watches">
            ساعات
          </Link>
        
          <Link className={identifier} to="/Wallets">
            محافظ
          </Link>
        
          <Link className={identifier} to="/CapsGlasses">
          طواقي ونظارات
          </Link>
        
          <Link className={identifier} to="/Accesories">
            إكسسوارات
          </Link>
        
          <Link className={identifier} to="/Bags">
            حقائب للمناسبات
          </Link>
        
      </div>
    );
  }

  return (
    <div className="shadow-lg shadow-violet-700">
      {/* <ShoppingCart/> */}
      {/* side bar area start */}
      <ul className="side-bar" style={sideMenuStyle}>
        <li>
          <Link to="#" onClick={displaySwap}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#5f6368"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </Link>
        </li>
        
          <br />
          {listOfSections("whitespace-nowrap bar-item w-full hover:bg-gray-200 p-4","flex flex-col pr-4 w-full")}
        
      </ul>
      {/* menu icon area end */}

      {/* top bar area start */}
      <div className="flex justify-between items-center gap-14 h-20 pr-8 pl-8">
        {/* menu icon */}
        {smallScreen && (
          <button onClick={displaySwap} className={baritem}>
            <FiAlignJustify />
          </button>
        )}
        {/* website logo */}
        <Link to="/">
          <img class="text-black cursor-pointer h-14 w-16 min-w-14 " src={logo} alt="logo" />
        </Link>
        {/* sorts of products */}
        <div className="sorts hideOnMobile">
          <ul>
            <li></li>
            {listOfSections(" bar-item hideOnMobile whitespace-nowrap", "flex gap-4 items-center")}
          </ul>
        </div>
        {/* icons of cart and favorites */}
        <div className="cart-favorate flex items-center gap-4">
          <Link className={baritem} to="/Favorites">
          <div className="bg-red-600 text-white rounded-full bar-item items-center flex justify-center h-6 w-6 -mr-5 -mt-5 -mb-1" style={{color:"white"}}>{favorites.length}</div>
            <i className="fa-regular fa-heart love-icon "></i>
          </Link>
          <Link className="bar-item" to='/Profile'>
          <IoPersonSharp />
          </Link>
         
          <i
            onClick={()=>HandleClickOnCart()}
            className="fa-solid fa-cart-shoppin bar-item flex"
          >
            <div className="bg-violet-900 text-xs font-medium rounded-full bar-item items-center flex justify-center h-6 w-6 -mr-3 -mt-6" style={{color:"white"}}>{order.length}</div>
            <FaOpencart />
          </i>

          

          {!isAuthenticated &&<Link className="bar-item" to="/LogIn">
           <i class="fa-solid fa-right-to-bracket"></i>
          
          </Link>}
          {isAuthenticated  && <button className="bar-item" onClick={HandleLogOut}>
          <TbLogout2 />
          </button>}
        </div>
      </div>
      {/* Shopping Cart area start */}
      <div className="relative">
        {toggleSidebar}
        <div
          className={` fixed top-0 left-0 h-full w-80 bg-white shadow-lg transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out z-40`}
        >
          <div className=" flex justify-between items-center p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">عربة المشتريات</h2>
            <button onClick={toggleSidebar} className="text-2xl">
              &times;
            </button>
          </div>
         <div className="overflow-auto h-3/5 min-h-44 max-h-fit">
         {order.map((element)=>{
            
            return(
              <CartItem item={{product:element.product,quantity:element.quantity}}/>
            );
           
          })}
         </div>
          <div className="absolute bottom-4 left-0 w-full px-4">
            <p className="text-lg font-semibold">المجموع الفرعي : {totalPrice} شيكل</p>
            <button className="w-full bg-green-500 text-white py-2 mt-4 rounded" onClick={()=>HandleBuyCart()}>
              تأكيد الشراء
            </button>
            <button className="w-full bg-yellow-500 text-black py-2 mt-2 rounded" onClick={()=>handleDeleteCart()}>
              إنهاء الطلب
            </button>
          </div>
        </div>

        {isOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-30"
            onClick={toggleSidebar}
          ></div>
        )}
      </div>

      {/* Shopping Cart area end */}
      {/* lastProducts area start */}

      {/* <LastProducts/> */}

      {/* lastProducts area end */}
      {/* top bar area end */}
    </div>
  );
}

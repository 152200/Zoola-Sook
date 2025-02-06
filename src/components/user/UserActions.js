import React from 'react';
import { Link } from 'react-router-dom';
import { IoPersonSharp } from "react-icons/io5";
import { FaOpencart } from "react-icons/fa6";
import { TbLogout2 } from "react-icons/tb";

export default function UserActions({ 
  isAuthenticated, 
  HandleLogOut, 
  HandleClickOnCart, 
  favorites, 
  order, 
  baritem 
}) {
  return (
    <div className="cart-favorate flex items-center gap-4">
      <Link className={baritem} to="/Favorites">
        <div className="bg-red-600 rounded-full bar-item items-center flex justify-center h-6 w-6 -mr-5 -mt-5 -mb-1">
          <span className='text-white'>{favorites.length}</span>
        </div>
        <i className="fa-regular fa-heart love-icon"></i>
      </Link>
      
      <Link className="bar-item" to='/Profile'>
        <IoPersonSharp />
      </Link>
      
      <i onClick={HandleClickOnCart} className="fa-solid fa-cart-shoppin bar-item flex">
        <div className="bg-violet-900 text-xs  font-medium rounded-full bar-item items-center flex justify-center h-6 w-6 -mr-3 -mt-6">
          <span className='text-white'>{order.length}</span>
        </div>
        <FaOpencart />
      </i>

      {!isAuthenticated && 
        <Link className="bar-item" to="/LogIn">
          <i className="fa-solid fa-right-to-bracket"></i>
        </Link>
      }
      
      {isAuthenticated && 
        <button className="bar-item" onClick={HandleLogOut}>
          <TbLogout2 />
        </button>
      }
    </div>
  );
} 
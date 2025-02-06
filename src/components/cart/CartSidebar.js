import React from 'react';
import CartItem from "../../partials/CartItems.js";
import { useSelector, useDispatch } from "react-redux";
import { deleteCart } from '../../app/features/cartSlice';
import { toast } from 'react-toastify';
import axios from 'axios';
import { API_BASE_URL } from "../../config/api.js";

export default function CartSidebar({ isOpen, toggleSidebar, totalPrice, setTotalPrice, justifyStock }) {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order.orderitems);

  const handleDeleteCart = () => {
    dispatch(deleteCart());
  };

  async function HandleBuyCart() {
    const email = JSON.parse(localStorage.getItem('user'));
    if (!email) {
      toast.error("User not found in localStorage");
      return;
    }

    try {
      const userResponse = await axios.get(`${API_BASE_URL}/users/email`, {
        params: { email: email }
      });
      
      const user = userResponse.data;
      if (!user || !user._id) {
        toast.error("User not found in the database");
        return;
      }

      let productsToDB = order.map((item) => ({
        quantity: item.quantity,
        product: item.product._id
      }));
    
      const res = await axios.post(`${API_BASE_URL}/orders`, {
        orderItems: productsToDB,
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
          justifyStock(item);
        });
        dispatch(deleteCart());
        toast.success("عملية الشراء تمت بنجاح");
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-40`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">عربة المشتريات</h2>
          <button onClick={toggleSidebar} className="text-2xl">&times;</button>
        </div>
        <div className="overflow-auto h-3/5 min-h-44 max-h-fit">
          {order.map((element) => (
            <CartItem 
              key={element.product._id} 
              item={{product: element.product, quantity: element.quantity}} 
            />
          ))}
        </div>
        <div className="absolute bottom-4 left-0 w-full px-4">
          <p className="text-lg font-semibold">المجموع الفرعي : {totalPrice} شيكل</p>
          <button className="w-full bg-green-500 text-white py-2 mt-4 rounded" onClick={HandleBuyCart}>
            تأكيد الشراء
          </button>
          <button className="w-full bg-yellow-500 text-black py-2 mt-2 rounded" onClick={handleDeleteCart}>
            إنهاء الطلب
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="fixed inset-0 bg-black opacity-50 z-30" onClick={toggleSidebar} />
      )}
    </>
  );
} 
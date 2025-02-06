import React, { useState, useContext, useEffect } from "react";
import TopBar from "../components/top-bar";
import Footer from "../components/Footer";
import { FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import {Context} from '../index.js';
import {toast} from 'react-toastify';
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { removeItem } from "../app/features/cartSlice.js";
import { PiEmptyLight } from "react-icons/pi";
import { API_BASE_URL } from "../config/api.js";

let flag = true;

const ProfilePage = () => {
  const [userId, setUserId] = useState("");
  const { isAuthenticated,setIsAuthenticated} = useContext(Context);
  const cart = useSelector((state) => state.order.orderitems);
  const dispatch = useDispatch();

//   const [userInfo, setUserInfo] = useState({
//     name: "",
//     email: "",
//     address: "",
//     whatsapp:"",
//     isAdmin:"",
//     street:"",
//     apartment:"",
// });

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [street, setStreet] = useState("")
  const [apartment, setApartment] = useState("")
 

  function HandleLogOut(){
    if(isAuthenticated){
    setIsAuthenticated(false);
    toast.success("تم تسجيل الخروج",{autoClose:5000})
    }
    else{
      toast.info("لم تتم عملية تسجيل الدخول")
    }
  }

  async function GetUserInfo(){
  if(isAuthenticated){
    try {
      const res = await axios.get(`${API_BASE_URL}/users/`)

      if(res.status===200){
        //  toast.success(res.status)
        //  console.log(res.data[0].name)
        res.data.map((element)=>{
          if(element.email===JSON.parse(localStorage.getItem('user'))){
           setUserId(element._id)
            console.log(userId);
            setName(element.name)
            setEmail(element.email)
            setWhatsapp(element.phone)
            setStreet(element.street)
            setApartment(element.apartment)  
          }
        },)
          
      }

    } catch (error) {
      toast.error(error.message)
    }
  }
  
}

async function SaveUpdates(){
  if(isAuthenticated){
   try {
    const res = await axios.put(`${API_BASE_URL}/users/${userId}`,{
      name:name,
      email: email,
      phone: whatsapp,
      street: street,
      apartment: apartment,
        })
        toast.success('تم التعديل بنجاح')
   } catch (error) {
    toast.error(error.message);
   }
  }
}



// if(!isAuthenticated&&flag){
//   toast.info("لم يتم تسجيل الدخول");
//   flag = false;
// }

  

  
  

  const [orders] = useState([
    { id: 1, date: "2024-09-12", status: "Delivered", total: "$120" },
    { id: 2, date: "2024-08-15", status: "Shipped", total: "$80" },
  ]);

  async function justifyStock(item){
    try {
      // Fetch the latest product data to ensure we are working with up-to-date stock
      const productRes = await axios.get(`${API_BASE_URL}/products/${item.product._id}`);
      const latestProduct = productRes.data;
  
      if (!latestProduct) {
        toast.error("Product not found!");
        return;
      }
      
      // Update countInStock based on the latest product data
      const updatedStock = latestProduct.countInStock + item.quantity; // Add back the quantity removed
      // toast.info(updatedStock);
      // Now make the PUT request to update the product
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
    
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <TopBar />
      <div className=" sm:mx-5 lg:mx-auto px-4 py-8">
        {/* Account Information */}
        <div className="max-w-3xl lg:mx-auto space-y-6">
          <section className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">معلومات الحساب</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الاسم</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الإيميل</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">واتسأب</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">المحافظة</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">البلدة</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={apartment}
                    onChange={(e) => setApartment(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mt-6">
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors duration-200"
                onClick={() => SaveUpdates()}
              >
                حفظ التغييرات
              </button>
              <button 
                className=" hover:bg-blue-700 text-white bg-blue-600 px-6 py-2 rounded-md transition-colors duration-200"
                onClick={() => GetUserInfo()}
              >
                حمل المعلومات
              </button>
            </div>
          </section>

          {/* Cart Section */}
          <section className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">السلة</h2>
            {cart.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الاسم</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">السعر</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الكمية</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الصورة</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">إزالة</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {cart.map((item) => (
                      <tr key={item.product.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap">{item.product.name}</td>
                        <td className="px-4 py-3 whitespace-nowrap">{item.product.price}</td>
                        <td className="px-4 py-3 whitespace-nowrap">{item.quantity}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover rounded-md" />
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <button
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
                            onClick={() => {
                              justifyStock(item);
                              dispatch(removeItem(item.product.id));
                            }}
                          >
                            إزالة
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex justify-center items-center gap-2 py-8 text-gray-500">
                <span>السلة فارغة</span>
                <PiEmptyLight className="w-5 h-5" />
              </div>
            )}
          </section>

          {/* Logout Section */}
          <section className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg">
            <button 
              onClick={() => HandleLogOut()}
              className="w-full flex items-center justify-center gap-2 text-gray-700 hover:text-violet-900 transition-colors duration-200"
            >
              <FaSignOutAlt className="w-6 h-6" />
              <span className="text-xl font-bold">تسجيل الخروج</span>
            </button>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;

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
      const res = await axios.get("http://localhost:3000/users/")

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
    const res = await axios.put(`http://localhost:3000/users/${userId}`,{
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
      const productRes = await axios.get(`http://localhost:3000/products/${item.product._id}`);
      const latestProduct = productRes.data;
  
      if (!latestProduct) {
        toast.error("Product not found!");
        return;
      }
      
      // Update countInStock based on the latest product data
      const updatedStock = latestProduct.countInStock + item.quantity; // Add back the quantity removed
      // toast.info(updatedStock);
      // Now make the PUT request to update the product
      const response = await axios.put(`http://localhost:3000/products/${item.product._id}`, {
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
    <>
    <TopBar/>
    <div className="max-w-4xl mx-auto p-6">
      {/* معلومات الحساب */}
      <section className="bg-white  p-6 mb-6 w-1/2 mx-auto">
        <h2 className="text-2xl font-bold mb-4">معلومات الحساب</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">الاسم</label>
          <input
            type="text"
            className="mt-1 block w-full   p-2"
            value={name}
            onChange={(e) => setName( e.target.value )}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">الإيميل</label>
          <input
            type="email"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={email}
            onChange={(e) => setEmail( e.target.value )}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">واتسأب</label>
          <input
            type="email"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value )}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">المحافظة</label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300  p-2"
            value={street}
            onChange={(e) => setStreet( e.target.value )}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">البلدة</label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300  p-2"
            value={apartment}
            onChange={(e) => setApartment(e.target.value )}
          />
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md" 
         onClick={ () => SaveUpdates()}
        >
          حفظ التغييرات
        </button>
        <button 
        style={{
           backgroundColor:"blueviolet",marginRight:"5px"
        }}
        className=" text-white px-4 py-2 rounded-md " 
         onClick={ () => GetUserInfo()}
        >
         تحميل المعلومات
        </button>
      </section>
    
          {/* السلة .......................................................................................................................................*/}
          <section className="bg-white p-6 mb-6 w-1/2 mx-auto">
          <h2 className="text-2xl font-bold mb-4">السلة</h2>
          {cart.length > 0 ? (
            <table className="min-w-full table-auto">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2">الاسم</th>
                  <th className="px-4 py-2">السعر</th>
                  <th className="px-4 py-2">الكمية</th>
                  <th className="px-4 py-2">الصورة</th>
                  <th className="px-4 py-2">إزالة</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.product.id} className="border-b">
                    <td className="px-4 py-2">{item.product.name}</td>
                    <td className="px-4 py-2">{item.product.price}</td>
                    <td className="px-4 py-2">{item.quantity}</td>
                    <td className="px-4 py-2">
                      <img src={item.product.image} alt={item.product.name} className="w-12 h-12" />
                    </td>
                    <td className="px-4 py-2">
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                        onClick={() => {
                          justifyStock(item);
                          dispatch(removeItem(item.product.id));}}
                      >
                        إزالة
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex justify-center align-middle gap-4 whitespace-nowrap"><p>السلة فارغة</p> <PiEmptyLight style={{marginTop:"4.5px",minWidth:"15px",minHeight:"15px"}}/></div>
          )}
        </section>

      {/* الطلبات
      <section className="bg-white  p-6 mb-6 w-1/2 mx-auto">
        <h2 className="text-2xl font-bold mb-4">عمليات شراء سابقة</h2>
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">رقم الطلب</th>
              <th className="px-4 py-2">التاريخ</th>
              <th className="px-4 py-2">الحالة</th>
              <th className="px-4 py-2">المجموع</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="px-4 py-2">{order.id}</td>
                <td className="px-4 py-2">{order.date}</td>
                <td className="px-4 py-2">{order.status}</td>
                <td className="px-4 py-2">{order.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section> */}

     
     
      <section className="bg-white p-6 w-1/2 mx-auto">
      <Link to='/Payment'>
      <h2 className="text-2xl font-bold mb-4 hover:text-violet-900">معلومات الدفع</h2>
      </Link>
      </section>
      <section className="bg-white p-6 w-1/2 mx-auto">
      <button  onClick={()=> HandleLogOut()} >
      <h2 className="text-2xl font-bold mb-4 hover:text-violet-900 flex items-center gap-2"><FaSignOutAlt className="pt-2 w-8 h-8" />تسجيل الخروج </h2>
      </button>
      </section>
    </div>
    <Footer/>
    </>
  );
};





export default ProfilePage;

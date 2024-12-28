import React, { useState } from 'react';
import image1 from '../images/gucci2.jpg'
export default function ShoppingCart() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button onClick={toggleSidebar} className="fixed top-4 left-4 z-50 bg-blue-500 text-white px-4 py-2 rounded">
      <i class="fa-solid fa-cart-shopping"></i>
      </button>
      
      <div className={`fixed top-0 left-0 h-full w-80 bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-40`}>
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">عربة المشتريات</h2>
          <button onClick={toggleSidebar} className="text-2xl">&times;</button>
        </div>
        <div className="p-4">
          <div className="flex items-center space-x-4">
            <img src={image1} alt="" className="w-16 h-16 object-cover" />
            <div>
              <p className="text-sm font-medium">بكج ديور كروسويدي ٣ قطع</p>
              <span className="text-gray-600">200.00 شيكل</span>
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <button className="bg-blue-500 text-white px-2 py-1 rounded">+</button>
            <button className="bg-red-500 text-white px-2 py-1 rounded">🗑️</button>
          </div>
        </div>
        <div className="absolute bottom-4 left-0 w-full px-4">
          <p className="text-lg font-semibold">المجموع الفرعي: 200.00 شيكل</p>
          <button className="w-full bg-green-500 text-white py-2 mt-4 rounded">رؤية العربة</button>
          <button className="w-full bg-yellow-500 text-black py-2 mt-2 rounded">إنهاء الطلب</button>
      
        </div>
      </div>

      {isOpen && <div className="fixed inset-0 bg-black opacity-50 z-30" onClick={toggleSidebar}></div>}
    </div>
  );
}



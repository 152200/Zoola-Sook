import React ,{useEffect,useState}from 'react';
import image1 from '../images/gucci11.jpg'
import {toast} from 'react-toastify'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { removeItem } from '../app/features/cartSlice';
import { API_BASE_URL } from '../config/api';

export default function CartItem({item}){
 

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
   
    const dispatch = useDispatch();

    return (
      
        <div className="p-4">
            <div className="flex items-center space-x-4 gap-4">
              <img
                src={item.product.image}
                alt="Item"
                className="w-16 h-16 object-cover"
              />
              <div>
                <p className="text-sm font-medium">{item.product.name}</p>
                <span className="text-gray-600"> {item.product.price}شيكل</span>
                <br/>
                <span className="text-gray-600"> الكمية :{item.quantity}</span>

              </div>
              <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                        onClick={() => {
                          justifyStock(item);
                          dispatch(removeItem(item.product.id));}}
                      >
                        إزالة
                      </button>
            </div>
          </div>


    );
}
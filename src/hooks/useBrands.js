import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_BASE_URL } from '../config/api';

export function useBrands(brand) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get(`${API_BASE_URL}/products`);
        const filteredProducts = res.data.filter(pro => pro.brand === brand);
        setProducts(filteredProducts);
      } catch (error) {
        setError(error.message);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [brand]);

  return { products, loading, error };
} 
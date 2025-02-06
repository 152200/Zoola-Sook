import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';
import { toast } from 'react-toastify';

export default function BrandsBar() {
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/categories`);
                setBrands(response.data);
            } catch (error) {
                toast.error(error.message);
            }
        };
        
        fetchBrands();
    }, []);

    if (!brands || brands.length === 0) {
        return null;
    }

    return (
        <div className="h-[45px] bg-center bg-no-repeat bg-cover flex items-center justify-center gap-[30px]">
            {brands?.map((brand) => (
                <Link 
                    key={brand._id} 
                    to={`/brands/${brand.name}`}
                    className='hover:text-violet-700 transition-colors duration-200'
                >
                    {brand.name}
                </Link>
            ))}
        </div>
    );
}



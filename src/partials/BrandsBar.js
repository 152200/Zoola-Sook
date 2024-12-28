import React from 'react'
import { Link } from 'react-router-dom';

export default function BrandsBar(){
    return (
        <div className="h-[45px] bg-center bg-no-repeat bg-cover flex items-center justify-center gap-[30px]">
            <Link to="#" className='hover:text-violet-700'>بالنسياغا</Link>
            <Link to="#" className='hover:text-violet-700'>برادا</Link>
            <Link to="#" className='hover:text-violet-700'>غوتشي</Link>
        </div>
        
    );
}
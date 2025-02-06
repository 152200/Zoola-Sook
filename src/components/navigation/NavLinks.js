import React from 'react';
import { Link } from 'react-router-dom';

export default function NavLinks({ className, itemClassName }) {
  const links = [
    { to: "/Women", text: "النساء" },
    { to: "/Men", text: "الرجال" },
    { to: "/Watches", text: "ساعات" },
    { to: "/Wallets", text: "محافظ" },
    { to: "/CapsGlasses", text: "طواقي ونظارات" },
    { to: "/Accesories", text: "إكسسوارات" },
    { to: "/Bags", text: "حقائب للمناسبات" },
  ];

  return (
    <div className={`${className} rtl`}>
      {links.map((link) => (
        <Link 
          key={link.to} 
          className={`${itemClassName} transition-colors duration-200`} 
          to={link.to}
        >
          {link.text}
        </Link>
      ))}
    </div>
  );
} 
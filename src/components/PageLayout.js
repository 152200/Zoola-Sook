import React from 'react';
import TopBar from './top-bar';
import BrandsBar from '../partials/BrandsBar';
import Footer from './Footer';

export default function PageLayout({ title, backgroundImage, children }) {
  return (
    <div>
      <TopBar />
      <div 
        className="h-[220px] bg-center bg-no-repeat bg-cover flex items-center justify-center" 
        style={{
          fontFamily: "Tajwal",
          fontSize: "2.25rem",
          color: "white",
          backgroundImage: `url('${backgroundImage || "https://png.pngtree.com/thumb_back/fh260/background/20230408/pngtree-rainbow-curves-abstract-colorful-background-image_2164067.jpg"}')`
        }}
      >
        {title}
      </div>
      <BrandsBar />
      <hr />
      {children}
      <Footer />
    </div>
  );
} 
import React from 'react'
import TopBar from './top-bar';
import image from '../images/gucci12.jpg'
import './components.css'
import Footer from './Footer.jsx'
export default function ProductPage(){
    return(
        <div>
            <TopBar/>
            <br />
            <br />
            <br />
            <div className="flex flex-col md:flex-row p-4 bg-background rounded-lg shadow-lg w-2/3 m-auto">
              <div className="md:w-1/3">
                <img src={image} alt="Black handbag" className="w-3/4 rounded-lg h-auto " />
              </div>
              <div className="md:w-2/3 md:pl-4">
                <h2 className="text-xl font-bold text-primary">حقيبة جيس جلد تمساح كتف</h2>
                <p className="text-lg text-muted-foreground">السعر: 150.00 شيكل</p>
        
                <div className="mt-4">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    تغليف شفاف مع شريطة (5.00 شيكل)
                  </label>
                  <label className="flex items-center mt-2">
                    <input type="checkbox" className="mr-2" />
                    تغليف ورقي مع شريطة من 10-25 شيكل حسب عدد القطع (15.00 شيكل)
                  </label>
                </div>
        
                <textarea className="mt-4 w-full p-2 border border-border rounded-md" placeholder="في حال لديك ملاحظات خاصة للبائع"></textarea>
        
                <div className="flex items-center mt-4">
                  <button className="bg-secondary text-secondary-foreground hover:bg-secondary/80 px-4 py-2 rounded-lg">أضف إلى عربة التسوق</button>
                  <div className="flex items-center ml-4">
                    <button className="bg-muted text-muted-foreground px-2 py-1 rounded-full">-</button>
                    <span className="mx-2">1</span>
                    <button className="bg-muted text-muted-foreground px-2 py-1 rounded-full">+</button>
                  </div>
                </div>
        
                <div className="mt-4 text-sm text-muted-foreground">
                  <p>الشحن والإرجاع: يسأل سؤال</p>
                  <p>🛍️ الشحن خلال 3 - 4 أيام عمل</p>
                  <p>📦 15 دقيقة في آخر 7 ساعات</p>
                </div>
              </div>
            </div>
            <Footer/>
            </div>
    );
}


// 
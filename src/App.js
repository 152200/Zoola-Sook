import React  from 'react'
import MainPage from './components/MainPage'
import ProductPage from './components/Products/ProductsDetails.js'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Women from './pages/WomenPage'
import WatchesPage from './pages/WatchesPage'
import MenPage from './pages/MenPage'
import WalletsPage from './pages/WalletsPage'
import CapsGlassesPage from './pages/CapsGlassesPage'
import AccesoriesPage from './pages/AccesoriesPage'
import BagsPage from './pages/BagsPage'
import SignUp from './signUp'
import LogIn from './LogIn'
import FavoritesPage from './pages/FavoritesPage';
import ProfilePage from './pages/ProfilePage.jsx';
import PaymentPage from './pages/PaymentPage.js'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector,useDispatch } from 'react-redux';
import Modal from "./components/Modal";
import { swipeState } from './app/features/modalSlice.js';
import { BsWhatsapp } from "react-icons/bs";




function App() {
  const dispatch = useDispatch();
  const product = useSelector((state)=> state.modal.modalProduct);
  const modalState = useSelector((state)=> state.modal.modalState);
 
  return (
    
    
     
      <Router basename='Zoola-Sook'> 
      <div className="App">
        <Modal show={modalState} onClose={ () => {dispatch(swipeState())}} props={{product:product}}/>
        <Routes>
          <Route path="/product" element={<ProductPage/>} />
          <Route path="/Women" element={<Women/>}/>
          <Route path="/Men" element={<MenPage/>}/>
          <Route path="/Watches" element={<WatchesPage/>}/>
          <Route path="/Wallets" element={<WalletsPage/>}/>
          <Route path="/CapsGlasses" element={<CapsGlassesPage/>}/>
          <Route path="/Accesories" element={<AccesoriesPage/>}/>
          <Route path="/Bags" element={<BagsPage/>}/>
          <Route path="/SignUp" element={<SignUp/>}/>
          <Route path="/LogIn" element={<LogIn/>}/>
          <Route path="/Favorites" element={<FavoritesPage/>}/>
          <Route path="/Profile" element={<ProfilePage/>}/>
          <Route path="/Payment" element={<PaymentPage/>}/>
          <Route path="/" element={<MainPage/>}/>
        </Routes>
        
        <a 
          href="https://wa.me/972568330330" 
          target='_blank' 
          rel="noopener noreferrer"
          className='fixed bottom-10 right-10 text-green-700 hover:scale-110 transition-transform duration-200 z-[9999]'
        >
          <BsWhatsapp className='w-10 h-10' />
        </a>
        <ToastContainer position="top-center" />
      </div>
     
    </Router>
 
    
  );
  
  
}

export default App;



// import React, { useEffect } from 'react';
// import { createBrowserRouter, RouterProvider, useLocation } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { ToastContainer } from 'react-toastify';
// import { BsWhatsapp } from "react-icons/bs";
// import Modal from './components/Modal';
// import { swipeState } from './app/features/modalSlice.js';
// import 'react-toastify/dist/ReactToastify.css';

// // Import components and pages
// import MainPage from './components/MainPage';
// import ProductPage from './components/Products/ProductsDetails.js';
// import Women from './pages/WomenPage';
// import WatchesPage from './pages/WatchesPage';
// import MenPage from './pages/MenPage';
// import WalletsPage from './pages/WalletsPage';
// import CapsGlassesPage from './pages/CapsGlassesPage';
// import AccesoriesPage from './pages/AccesoriesPage';
// import BagsPage from './pages/BagsPage';
// import SignUp from './signUp';
// import LogIn from './LogIn';
// import FavoritesPage from './pages/FavoritesPage';
// import ProfilePage from './pages/ProfilePage.jsx';
// import PaymentPage from './pages/PaymentPage.js';

// // Scroll to top on route change
// function ScrollToTop() {
//   const location = useLocation();

//   useEffect(() => {
//     document.querySelector('html').style.scrollBehavior = 'auto';
//     window.scroll({ top: 0 });
//     document.querySelector('html').style.scrollBehavior = '';
//   }, [location.pathname]);

//   return null;
// }

// // Define routes with the router
// const router = createBrowserRouter(
//   [
//     {
//       path: '/',
//       element: <MainPage />,
//     },
//     {
//       path: '/product',
//       element: <ProductPage />,
//     },
//     {
//       path: '/Women',
//       element: <Women />,
//     },
//     {
//       path: '/Men',
//       element: <MenPage />,
//     },
//     {
//       path: '/Watches',
//       element: <WatchesPage />,
//     },
//     {
//       path: '/Wallets',
//       element: <WalletsPage />,
//     },
//     {
//       path: '/CapsGlasses',
//       element: <CapsGlassesPage />,
//     },
//     {
//       path: '/Accesories',
//       element: <AccesoriesPage />,
//     },
//     {
//       path: '/Bags',
//       element: <BagsPage />,
//     },
//     {
//       path: '/SignUp',
//       element: <SignUp />,
//     },
//     {
//       path: '/LogIn',
//       element: <LogIn />,
//     },
//     {
//       path: '/Favorites',
//       element: <FavoritesPage />,
//     },
//     {
//       path: '/Profile',
//       element: <ProfilePage />,
//     },
//     {
//       path: '/Payment',
//       element: <PaymentPage />,
//     },
//   ],
//   { basename: '/Zoola-Sook' } // Replace "your-base-name" with the desired base path
// );

// function App() {
//   const dispatch = useDispatch();
//   const product = useSelector((state) => state.modal.modalProduct);
//   const modalState = useSelector((state) => state.modal.modalState);

//   return (
//     <>
//       <Modal
//         show={modalState}
//         onClose={() => {
//           dispatch(swipeState());
//         }}
//         props={{ product: product }}
//       />
//       <RouterProvider
//         router={router}
//         fallbackElement={<ScrollToTop />}
//       />
//       <a
//         href="https://wa.me/972568330330"
//         target="_blank"
//         rel="noopener noreferrer"
//         className="fixed bottom-10 right-10 text-green-700"
//       >
//         <BsWhatsapp className="w-10 h-10 z-99" />
//       </a>
//       <ToastContainer position="top-center" />
//     </>
//   );
// }

// export default App;


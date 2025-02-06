import React from 'react'
// import '../assets/css/custom.css'
import {Link } from 'react-router-dom'

export default function Footer() {
    
          return (
           
                    <div className=" mt-4 pt-10 shadow-sm px-10 bg-violet-900 text-white font-bold py-5 ">
                         <div className='flex justify-center flex-wrap gap-11 lg:mx-auto sm:mx-5'>
                              
                                   <div className="flex flex-col p-2 align-middle gap-2"  >
                                        <h3  className='text-xl' >Contact us </h3>
                                        <a target='_blank' className='cursor-pointer text-center'><i className="fab mt-4 m-2 h4 fa-facebook mx-auto"></i></a>
                                        <a target='_blank' className=' cursor-pointer text-center'><i className="fab m-2 h4 fa-instagram mx-auto"></i></a>
                                        {/* <a target='_blank' className=' cursor-pointer text-center'><i class="fa-brands fa-tiktok mx-auto"></i></a> */}
                                   </div>
                                   {/* <div className="flex flex-col p-2" >
                                        <h3 className='text-xl' >More Information </h3>
                                        <a>purchase policy</a ><br></br>
                                        <a> Privcey policy</a ><br></br>
                                        <a> Refund Policy </a ><br></br>
                                   </div> */}
                                   <div className="flex flex-col p-2 gap-2"  >
                                        <h3  className='text-xl'>About Company </h3>
                                        <Link to ="/about"   className='text-center'>About us</Link >
                                        <Link to ="/company" className='text-center'>Company</Link>
                                        <Link to ="/contact" className='text-center'>Contact us </Link>
                                   </div>
                                   <div className="flex flex-col p-2 gap-2" >
                                        <h3 className='text-xl text-center'>Company Address </h3>
                                        <p className='text-center'>1765 Zafer Street - near the city of center </p>
                                        <span className='text-center'> <i className="fa fa-envelope"></i> info@ctp.com </span>
                                   </div>
                              
                              
                         </div>
                         <br/>
                                   <div className="text-center  pt-3 bg-dark mx-auto mb-7 ">
                                        <h6 className="mb-4">All Rights is reserved for ctp 2022 </h6>
                                   </div>
                              
                    </div>
               
          )
     
}

import React, { Component, Fragment } from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import '../assets/css/custom.css'
import {Link } from 'react-router-dom'
export class Footer extends Component {
     render() {
          return (
           
                    <div className="footerback  m-0 mt-4 pt-10 shadow-sm px-10 ">
                         <div className='flex justify-between flex-wrap pt-5'>
                              
                                   <Col className="p-2" lg={3} md={3} sm={6} >
                                        <h5 className="footer-menu-title" >Contact us </h5>
                                        <a className='facebook social'><i className="fab mt-4 m-2 h4 fa-facebook"></i></a>
                                        <a className='facebook social'><i className="fab m-2 h4 fa-instagram"></i></a>
                                        <a className='facebook social'><i class="fa-brands fa-tiktok"></i></a>
                                   </Col>
                                   <Col className="p-2" lg={3} md={3} sm={6} >
                                        <h5 className="footer-menu-title">More Information </h5>
                                        <a className="footer-link" >purchase policy</a ><br></br>
                                        <a className="footer-link"> Privcey policy</a ><br></br>
                                        <a className="footer-link" > Refund Policy </a ><br></br>
                                   </Col>
                                   <Col className="p-2" lg={3} md={3} sm={6} >
                                        <h5 className="footer-menu-title">About Company </h5>
                                        <Link to ="/about" className="footer-link" >About us</Link ><br></br>
                                        <Link to ="/company" className="footer-link">Company</Link><br></br>
                                        <Link to ="/contact" className="footer-link" >Contact us </Link><br></br>
                                   </Col>
                                   <Col className="p-2" lg={3} md={3} sm={6} >
                                        <h5 className="footer-menu-title">Company Address </h5>
                                        <p className='address' >1765 Zafer Street - near the city of center </p>
                                        <span className='address'> <i className="fa fa-envelope"></i> info@ctp.com </span>
                                   </Col>
                              
                              
                         </div>
                         <Container fluid={true} className="text-center m-0 pt-3 pb-1 bg-dark">
                              <Container>
                                   <br />
                                   <br />
                                   <br />
                                   <Row>
                                        <h6 className="address">All Rights is reserved for ctp 2022 </h6>
                                   </Row>
                              </Container>
                         </Container>
                    </div>
               
          )
     }
}
export default Footer
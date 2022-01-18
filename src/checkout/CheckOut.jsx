import React, {useEffect, useState} from 'react';
import { useStateValue } from '../StateProvider';
import './CheckOut.css';
import Subtotal from './subtotal/Subtotal';
import AOS from 'aos';
import "aos/dist/aos.css";

function CheckOut() {
    const [{basket},dispatch] = useStateValue()
useEffect(() => {
  AOS.init({
    duration : 2000,
    once: true,
  });
}); 
    return (
        <div className="cart content">
            <div className="cart-list">
                        <ul className="cart-list-container">
                            <li>
                                <h3>Shoping Cart</h3>
                                <div>Price</div>
                            </li>
                            {
                                basket.length === 0?
                                (<div>Cart is empty. <a href="/#/">Go Shoping</a></div>):
                                basket.map(item => (                                    
                                <li data-aos="flip-left">
                                    <div className="cart-image">
                                        <img src={item.image} alt={item.title}/>
                                    </div>
                                    <div className="cart-name">
                                        <div>                                            
                                            {item.title}                                            
                                        </div>
                                    </div>
                                    <div className="cart-price">
                                        $ {item.price}
                                    </div>  
                                </li>
                                ))
                            }                                                                                                                             
                        </ul>
                    </div>
                    <div className="cart-action">                             
                        <Subtotal/>                              
                    </div>
        </div>
    )
}

export default CheckOut

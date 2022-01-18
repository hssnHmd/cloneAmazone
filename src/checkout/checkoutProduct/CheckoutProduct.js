import React from 'react';
import './CheckoutProdcut.css';
import StarIcon from '@material-ui/icons/Star';
import { useStateValue } from '../../StateProvider';


function CheckoutProduct({id, title, image, price, rating, priceSup, hideButton}) {
    const [{basket},dispatch] = useStateValue();
    const removeFromBasket = () =>{
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id
        })
    }
    return (
        <div className="checkoutProduct">
            <img className="checkoutProduct_image" src={image} alt='checkoutPro' />
            <div className="checkoutProdcut_info">
                <p className="checkoutProdcut_title">{title}</p>
                <p className="checkoutProdcut_price">
                    
                  <sup>$</sup>  <strong>{price},{priceSup}</strong> 
                  {/* <sup>{priceSup.toFixed(2).toString().slice(2)}</sup> */}
                    
                </p>
                 <div className="checkoutProduct_rating">                  
                    {Array(rating).fill().map((_,i) =>
                    <StarIcon key={i}/>
                    )}
                </div>
                {  
                    !hideButton && 
                         <button onClick={removeFromBasket}>Remove from checkout</button>                    
                }
            </div>
        </div>
    )
}

export default CheckoutProduct


{/* <div className="checkout_left">
               <img src="https://images-eu.ssl-images-amazon.com/images/G/31/prime/onsite/Apr18/PeX_1500x200._CB1198675309_.jpg" alt="" className="checkout_ad" />
                <div>
                   
                    <h3> hello , {user?.email}</h3>
                    <h2 className="checkout_title">Your shopping basket</h2>
             
                    
                    {
                        basket.map((item, key) =>
                        
                            <CheckoutProduct
                            key={key}
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            priceSup={item.priceSup}
                            rating={item.rating}
                            /> 
                      
                        )
                    }
                 
   
                </div>
           </div>
           <div className="checkout_right">
               <Subtotal/>
           </div> */}

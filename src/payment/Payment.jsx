import React, {useState, useEffect} from 'react';
import './Payment.css';
import {useStateValue} from '../StateProvider';
import CheckoutProduct from '../checkout/checkoutProduct/CheckoutProduct';
import { Link, useNavigate} from 'react-router-dom';
import {CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './../reducer/reducer';
import axios from '../axios/axios';
import { db } from '../firebase';

function Payment() {
   const [{basket, user},dispatch] = useStateValue();
   const [error, seterror] = useState(null);
   const [disable, setdisable] = useState(true);

   const [processing, setprocessing] = useState("");
   const [success, setsuccess] = useState(false);
   const [clientSecret, setclientSecret] = useState(true)

   const stripe = useStripe();
   const elements = useElements();
   const navigate = useNavigate()

useEffect(() => {
  // generate the special stripe secret wich allows u to charge a customer
  const getClientSecret = async () =>{
    const response = await axios({
      method:'post',
      // stripe expect the total in a currency subunits
      url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
    });
    setclientSecret(response.data.clientSecret)
  }
  getClientSecret()
}, [basket]);

console.log('The secret is :', clientSecret)

const handleSubmit = async(e) =>{
  e.preventDefault();
  setprocessing(true)
  const payload = await stripe.confirmCardPayment(clientSecret,{
    payment_method: {
      card: elements.getElement(CardElement),
    },
  }).then(({paymentIntent}) =>{
    // paymentIntent = payment confirmation
    db.collection('users')
      .doc(user?.uid)
      .collection('orders')
      .doc(paymentIntent.id)
      .set({
        basket: basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created
      })
    setsuccess(true);
    seterror(null)
    setprocessing(false);
    dispatch({
      type:'EMPTY_BASKET'
    })
    navigate('/orders', { replace: true })
  })
}

const handleChange = e => {
  // 
  setdisable(e.empty);
  seterror(e.error ? e.error.message : "")

}
    return (
        <div className="payment">
            <div className="payment_container">
              <h1>
                Checkout: <Link to='/chekout'>{basket?.length} items</Link>
              </h1>
              <div className="payment_section">
                <div className="payment_title">
                    <h3>Delivery Address</h3>
                </div>
                <div className="payment_address">
                  <p>{user?.email.slice(0,-10)}</p>
                  <p>123 Lan React</p>
                  <p>Los anglos ,US</p>
                </div>
              </div>
              <div className="payment_section">
                <div className="payment_title">
                  <h3> Review items and Delivery </h3>
                </div>
                <div className="payment_items">
                  {
                    basket.map((item, key) =>(
                      <CheckoutProduct 
                        key={key}
                        id={item.id}
                        title={item.title}
                        image={item.image}
                        price={item.price}
                        rating={item.rating}
                      />
                    ))
                  }
                </div>
              </div>
              <div className="payment_section">
                <div className="payment_title">
                  <h3> Payment Method </h3>
                </div>
                <div className="payment_details">
                  <form onSubmit={handleSubmit}>
                    <CardElement onChange={handleChange} />
                    <div className="payment_priceContainer">
                        <CurrencyFormat
                              renderText={(value) => (                    
                                  <h3>Order Total: {value}</h3>
                              )}
                              decimalScale={2}
                              value={getBasketTotal(basket)}
                              displayType={'text'}  
                              thousandSeparator={true}
                              prefix={"$"}
                        />
                        <button disabled={processing || disable || success}>
                          <span>{processing ? <p>Processing</p> : 'Buy Now'}</span>
                        </button>
                    </div>
                    {error && <div>{error}</div>}
                  </form>
                </div>
              </div>
            </div>
        </div>
    )
}

export default Payment

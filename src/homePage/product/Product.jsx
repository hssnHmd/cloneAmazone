import React ,{useEffect} from 'react'
import './Product.css';
import StarIcon from '@material-ui/icons/Star';
import { useStateValue } from '../../StateProvider';
import AOS from 'aos';
import "aos/dist/aos.css";

function Product({id, title,image,rating,price,priceSup,countInStock, qty}) {
    const [{basket},dispatch] = useStateValue();
    const addToBasket = (productId, qty) =>{
        dispatch({
            type:'ADD_TO_BASKET',
            item: {
                id:id,
                title: title,
                image: image,
                price: price,
                priceSup: priceSup,
                rating: rating,
                countInStock: countInStock,
                qty:1
            }
        })
    }
useEffect(() => {
  AOS.init({
    duration : 2000
  });
}, []);
    return (
        <div className="product" data-aos={"fade-right"}>
            <div className="product_info">
                <p>{title}</p>
                <p className="product_price">
                    <sup>$</sup>
                    <strong>{price}</strong> <sup>{priceSup.toFixed(2).toString().slice(2)}</sup>                    
                </p>
                <div className="product_rating">
                    {Array(rating).fill().map((_,i) =>
                    <StarIcon key={i}/>
                    )}                    
                </div>
            </div>
            <div className="product-image">
                <img  src={image} alt="product1" />
            </div>
            <button onClick={addToBasket}>Add to Basket</button>
        </div>
    )
}

export default Product

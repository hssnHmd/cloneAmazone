import React, { useState, useEffect } from 'react';
import './Home.css';
import Product from './product/Product';
import {products, secondCatego } from '.././productData'
import SimpleImageSlider from "react-simple-image-slider";



function Home() {
    const [active, setActive] = useState("men");
    const handleHomeTab = () => {
        setActive("men");
    };
    const handleTagTab = () => {
        setActive("women");
    };
    const images = [
            { url: "https://cdn.mos.cms.futurecdn.net/NpEXSYBYReu4ovAXMm45o6.jpg" },
            { url: "https://m.media-amazon.com/images/I/61eYEF8XidL._SX1500_.jpg" },
            { url: "https://www.tagesschau.de/multimedia/bilder/amazon-287~_v-original.jpg" },            
            ];

    
    return (
        <div className="home">
            <div className="home-container">
                <div className="home_image">
                    <SimpleImageSlider                  
                    width='99%'
                    height={504}
                    images={images}
                    slideDuration={5}
                    autoPlayDelay={5.0}
                    autoPlay={true}                   
                />
                </div>
                <div className="home_roww">
                    <div className={active === "men"? 'categorie_active':'catdiv '} onClick={handleHomeTab}>Men </div>
                    <div className={active === "women" ? ' categorie_active':'catdiv'} onClick={handleTagTab}>Women</div>
                </div>
                {
                    active === "men" ? 
                <div className="home_row">
                    {products.map((item,i)=> (
                        <Product
                        
                            key={i}
                            id={item.id}
                            title={item.title}
                            price={item.price} 
                            priceSup={item.priceSup}
                            rating={item.rating} 
                            image={item.image}
                            countInStock={item.countInStock}
                        /> 
                    ))}                   
                 </div> 
                 :
                 <div className="home_row">
                    {secondCatego.map((item, k)=> (
                        <Product
                        key={k}
                        id={item.id}
                        title={item.title}
                        price={item.price} 
                        priceSup={item.priceSup}
                        rating={item.rating} 
                        image={item.image}
                        countInStock={item.countInStock}
                  /> 
                    ))}                   
                 </div> 
}
            </div>
        </div>
    )
}
export default Home

import React, { useState } from 'react';
import { useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif'

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const handlePlaceOrder = () => {
        setCart([]);
        setOrderPlaced(true);
        processOrder();
    }
    let thankYou;
    if (orderPlaced) {
        thankYou = <img src={happyImage} alt=""/>
    }

    const handleRemoveProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);

    }

    useEffect(() => {
        const saveCart = getDatabaseCart();
        const productKey = Object.keys(saveCart);
        const cartProducts = productKey.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = saveCart[key];
            return product;
        })
        setCart(cartProducts)
    }, []);


    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    cart.map(pd => <ReviewItem removeProduct={handleRemoveProduct} key={pd.key} product={pd} ></ReviewItem>)
                }
                { thankYou }
            </div>
            <div>
                <Cart cart={cart}></Cart>
                <button onClick={handlePlaceOrder} className="main-btn">Place Order</button>
            </div>
        </div>
    );
};

export default Review;
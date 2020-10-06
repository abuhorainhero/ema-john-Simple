import React, { useState } from 'react';
import { useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif'
import { useHistory } from 'react-router-dom';
import loadingImage from '../../loading.gif';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const history = useHistory();

    const [loading, setLoading] = useState(true);

    const handleProceedCheckout = () => {
        history.push('./shipment');
    }
    let thankYou;
    if (orderPlaced) {
        thankYou = <img src={happyImage} alt="" />
    }

    const handleRemoveProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);

    }

    useEffect(() => {
        const saveCart = getDatabaseCart();
        const productKey = Object.keys(saveCart);

        fetch('https://infinite-anchorage-99654.herokuapp.com/productByKeys', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(productKey)
        })
            .then(res => res.json())
            .then(data => {
                setCart(data);
                setLoading(false);
            })

        // const cartProducts = productKey.map(key => {
        //     const product = fakeData.find(pd => pd.key === key);
        //     product.quantity = saveCart[key];
        //     return product;
        // })
        // setCart(cartProducts)
    }, []);


    return (
        <div className="twin-container">

            {
                loading ? <img src={loadingImage} alt="" /> : <>
                    <div className="product-container">
                        {
                            cart.map(pd => <ReviewItem removeProduct={handleRemoveProduct} key={pd.key} product={pd} ></ReviewItem>)
                        }
                        {thankYou}
                    </div>
                    <div>
                        <Cart cart={cart}></Cart>
                        <button onClick={handleProceedCheckout} className="main-btn">Proceed Checkout</button>
                    </div>
                </>
            }

        </div>
    );
};

export default Review;
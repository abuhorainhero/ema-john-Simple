import React, { useContext, useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import loadingImage from '../../loading.gif'

const Shop = () => {
    // console.log(fakeData)
    // const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://infinite-anchorage-99654.herokuapp.com/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
    }, [])

    useEffect(() => {
        const saveProduct = getDatabaseCart();
        const productKey = Object.keys(saveProduct);
        fetch('https://infinite-anchorage-99654.herokuapp.com/productByKeys', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(productKey)
        })
            .then(res => res.json())
            .then(data => setCart(data))

    }, [products]);

    const handleAddProduct = (product) => {
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);

        addToDatabaseCart(product.key, count)
    }
    return (
        <div className="twin-container">
            {
                loading ? <img src={loadingImage} alt=""/> : <>
                    <div className="product-container">
                        {
                            products.map(pd => <Product
                                key={pd.key}
                                showAddToCart={true}
                                product={pd}
                                handleAddProduct={handleAddProduct}
                            >
                            </Product>)
                        }
                    </div>
                    <div className="cart-container">
                        <Cart cart={cart}></Cart>
                        <Link to='/review'>
                            <button className="main-btn">Review order</button>
                        </Link>
                    </div>
                </>
            }

        </div>
    );
};

export default Shop;
import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Shop = () => {
    // console.log(fakeData)
    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);

    useEffect(() =>{
        const saveProduct = getDatabaseCart();
        const productKey = Object.keys(saveProduct);
        const previousCart = productKey.map(existingKey => {
            const product = fakeData.find(pd => pd.key === existingKey);
            product.quantity = saveProduct[existingKey];
            return product;
        })
        setCart(previousCart);
    }, []);

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
            <div className="product-container">
                {
                products.map(pd => <Product
                    key={pd.key}
                    showAddToCart={true} 
                    product={pd}
                    handleAddProduct = {handleAddProduct}
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
        </div>
    );
};

export default Shop;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';
import loadingImage from '../../loading.gif';

const ProductDetail = () => {
    const { productKey } = useParams();
    const [product, setProduct] = useState({});

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://infinite-anchorage-99654.herokuapp.com/product/' + productKey)
            .then(res => res.json())
            .then(data => {
                setProduct(data)
                setLoading(false);
            })
    }, [productKey])

    return (
        <div>
            <h1>Product Details. </h1>
            {loading ? <img src={loadingImage} alt="" /> : <Product showAddToCart={false} product={product}></Product>}
        </div>
    );
};

export default ProductDetail;
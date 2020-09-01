import React from 'react';


const Cart = (props) => {
    const cart = props.cart;
    // const total = cart.reduce( (total, prd) => total + prd.price , 0);
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price * product.quantity;
        // debugger;
    }

    let shipping = 0;
    if (total > 35) {
        shipping = 0;
    }
    else if (total > 15) {
        shipping = 4.99;
    }
    else if (total > 0) {
        shipping = 12.99;
    }

    const tex = (total / 10).toFixed(2);
    const grandTotal = (total + shipping + Number(tex)).toFixed(2);

    const formatNumber = num => {
        const prosission = num.toFixed(2)
        return Number(prosission);
    }

    return (
        <div>
            <h3>Order Summary </h3>
            <p>Item ordered : {cart.length}</p>
            <p>Product price : {formatNumber(total)}</p>
            <p>Shipping cost : {shipping}</p>
            <p>Tex + Vat : {tex}</p>
            <p>Total price : {grandTotal}</p>
            <br/>
            {
                props.children
            }
        </div>
    );
};

export default Cart;
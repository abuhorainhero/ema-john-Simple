import React from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import './Shipment.css';

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const onSubmit = data => {
        const saveProduct = getDatabaseCart();
        const orderDetails = { ...loggedInUser, products: saveProduct, shipment: data, orderTime: new Date() };
        fetch('https://infinite-anchorage-99654.herokuapp.com/addOrders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderDetails)
        })
        .then(res => res.json())
        .then(data => {
            if(data){
                processOrder();
                alert("Your Order placed Successfully");
            }
        })
    };

    console.log(watch("example"));

    return (
        <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
            <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Your Name" />
            {errors.name && <span className="error">Name is required</span>}

            <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="Your Email" />
            {errors.email && <span className="error">Email is required</span>}

            <input name="address" ref={register({ required: true })} placeholder="Your address" />
            {errors.address && <span className="error">address is required</span>}

            <input name="phone" ref={register({ required: true })} placeholder="Your phone" />
            {errors.phone && <span className="error">phone is required</span>}

            <input type="submit" />
        </form>
    );
};

export default Shipment;
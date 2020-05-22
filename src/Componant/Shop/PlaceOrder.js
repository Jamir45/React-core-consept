import React from 'react';
import { Link } from 'react-router-dom';

const PlaceOrder = () => {
    return (
        <div className='container text-center'>
            <h1>Thank You Your Order is Placed</h1>
            <p style={{color:'orange'}}> <b>Please continue your shopping</b> </p>
            <Link to='/'><button className='btn btn-success'>Continue</button></Link>
        </div>
    );
};

export default PlaceOrder;
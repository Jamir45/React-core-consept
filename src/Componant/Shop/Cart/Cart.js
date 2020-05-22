import React from 'react';
import { Link } from 'react-router-dom';

const Cart = (props) => {
    const totalAdded = props.cart
    // console.log(totalAdded)
    // const total = totalAdded.reduce( (price, element) => {
    //     return (price+element.price)
    // })

    let total = 0;
    for (let i = 0; i < totalAdded.length; i++) {
        const product = totalAdded[i];
        total = total + product.price;
    }
    let shipping = 0;
    if (total > 0 && total<500) {
        shipping = 5;
    }
    else if (total > 501 && total<1000) {
        shipping = 12;
    }
    else if (total > 1001 && total<1500) {
        shipping = 25;
    }
    else{
        shipping = 0;
    }
    const vat = (total*2)/100
    const totalAmount = (total+shipping+vat);

    return (
        <div>
            <h1>This is cart</h1>
            <h5>Items Ordered : {(totalAdded.length)}</h5>
            <p>Product Amount : {(total.toFixed(2))}</p>
            <p>Shipping Charge : {shipping}</p>
            <p>Text & Vat : {vat.toFixed(2)}</p>
            <p><b>Total Amount : {totalAmount.toFixed(2)}</b></p>   
            <Link to='/review'><button className="btn btn-success">Review Product</button></Link>
        </div>
    );
};

export default Cart;
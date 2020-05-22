import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ReviewDetails = (props) => {
    const {name, seller, stock, img, price, key, quantity} = props.cartProduct;
    // const [count, setCount] = useState(quantity);
    return (
        <div className="d-flex Border container">
            <div className="productImg">
                <img src={img} alt=""/>
            </div>
            <div className="productDetails">
                <h5>Product Name : <Link to={'/product/'+key}>{name}</Link></h5>
                <p><b> Seller : </b>{seller}</p>
                <p>Left in stock : {stock}</p>
                <p>Quantity : {quantity}</p>
                <p><b>Product Price : </b>{price}</p>
                <p><b>Total Price : </b>{(price)*(quantity)}</p>
                <button className="btn btn-success" onClick={ () => props.removeHandler(props.cartProduct)}>Remove from Cart</button>
            </div>
        </div>
    );
};

export default ReviewDetails;
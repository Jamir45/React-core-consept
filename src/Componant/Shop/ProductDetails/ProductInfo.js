import React from 'react';
import { Link } from 'react-router-dom';

const ProductInfo = (props) => {
    const {name, seller, stock, img, price} = props.productData;
    return (
        <div className='container d-flex borderBottom'>
            <div className="productImg">
                <img src={img} alt=""/>
            </div>
            <div className="productDetails">
                {/* Dynamic Parameter */}
                <h5>Product Name : {name}</h5>
                <p><b> Seller : </b>{seller}</p>
                <p>Left in stock : {stock}</p>
                <p><b> Price : </b>{price}</p>
                <Link to='/'><button className='btn btn-success'>Back</button></Link>
            </div>
        </div>
    );
};

export default ProductInfo;